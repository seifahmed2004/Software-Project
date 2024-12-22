from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import ProductViewSet,sample_endpoint,login_user,signup_user, ProductListCreateView, ProductDetailView
from . import views

# Set up the router for the API
router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = [
    # API routes via router
    path('', include(router.urls)),

    # Custom views
    path('create/', views.create_data, name='create_data'),
    path('products/', ProductListCreateView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('api/', include('cart.urls')),
    path('login/', login_user, name='login_user'),
    path('signup/', signup_user, name='signup_user'),
    path('sample/', sample_endpoint, name='sample'),  # Include the cart app's URLs

    # JWT token routes
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
