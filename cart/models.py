from django.db import models

class CartItem(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)  # User who owns the cart
    product_name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def _str_(self):
        return f"{self.product_name} ({self.quantity})"