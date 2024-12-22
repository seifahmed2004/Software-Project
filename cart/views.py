from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
@csrf_exempt
@api_view(['POST'])
def add_to_cart(request):
    """
    Add an item to the cart.
    """
    user = request.user  # Ensure the user is authenticated
    data = request.data  # Data sent in the POST request

    product_name = data.get('product_name')
    quantity = data.get('quantity', 1)
    price = data.get('price')

    if not product_name or not price:
        return Response({"error": "Product name and price are required."}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the item is already in the cart
    cart_item, created = CartItem.objects.get_or_create(
        user=user,
        product_name=product_name,
        defaults={'quantity': quantity, 'price': price},
    )

    if not created:
        # If the item already exists, update the quantity
        cart_item.quantity += quantity
        cart_item.save()

    return Response({
        "message": "Item added to cart.",
        "item": {
            "id": cart_item.id,
            "product_name": cart_item.product_name,
            "quantity": cart_item.quantity,
            "price": cart_item.price,
        },
    }, status=status.HTTP_201_CREATED)
