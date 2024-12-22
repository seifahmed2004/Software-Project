from django.shortcuts import render
from shop.models import User, Product, Recipe
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import PermissionDenied

def create_data(request):
    # Create a new user
    user = User.objects.create(username='JohnDoe', email='john@example.com', password='password123')

    # Add a new product
    product = Product.objects.create(name='Milk', category='Dairy', price=15.00, stock=100)

    # Create a new recipe
    recipe = Recipe.objects.create(title='Eggs with Pastrami', instructions='Beat eggs and cook with pastrami.', user=user)

    return render(request, 'success.html')  # Render a success page or redirect



from rest_framework import generics, status
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
from .models import User

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    # Override GET method to fetch products and include a custom response
    def get(self, request, *args, **kwargs):
        products = Product.objects.all()
        serializer = self.get_serializer(products, many=True)
        
        # Add custom data if needed (e.g., username or custom info)
        output = {
            "username": "SeifAhmed",  # Replace with your logic to fetch username or other info
            "products": serializer.data
        }
        return Response(output)

    # Override POST method to create a new product and return custom data
    def post(self, request, *args, **kwargs):
        # Optionally, you can customize the request data before saving the product
        custom_data = request.data.copy()
        custom_data['created_by'] = "SeifAhmed"  # Example custom data (you can replace this with dynamic data)

        serializer = self.get_serializer(data=custom_data)
        if serializer.is_valid():
            serializer.save()  # Save the new product to the database
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductListCreateView(generics.ListCreateAPIView):
    """
    get:
    Return a list of all products.

    post:
    Create a new product.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
from rest_framework import generics
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import Product
from .serializers import ProductSerializer

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'category', openapi.IN_QUERY, 
                description="Filter products by category", 
                type=openapi.TYPE_STRING
            )
        ]
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

from drf_yasg.utils import swagger_auto_schema

@swagger_auto_schema(
    method='get',
    operation_description="Retrieve a list of products",
    responses={200: ProductSerializer(many=True)},
)
@api_view(['GET'])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


from rest_framework.viewsets import ModelViewSet
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(ModelViewSet):
    """
    A simple ViewSet for viewing and editing products.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = get_object_or_404(User, email=email)
        if user.check_password(password):
            return Response({'message': 'Login successful', 'username': user.username}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    except User.DoesNotExist:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@csrf_exempt  # Bypass CSRF checks
@api_view(['POST'])
def signup_user(request):
    """
    Create a new user.
    """
    name = request.data.get('name')
    email = request.data.get('email')
    password = request.data.get('password')

    if not name or not email or not password:
        return Response({"error": "Name, email, and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email is already registered."}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create(username=name, email=email, password=password)
    user.save()

    return Response({"message": "Account created successfully."}, status=status.HTTP_201_CREATED)

    user = User.objects.create(username=name, email=email, password=password)
    user.save()

    return Response({"message": "Account created successfully."}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([AllowAny])
def sample_endpoint(request):
    return Response({"message": "Hello from Django!"})    


@api_view(['GET'])
def sample_endpoint(request):
    if not request.user.is_authenticated:
        raise PermissionDenied("You do not have permission to access this endpoint.")
    return Response({"message": "Hello from Django!"})