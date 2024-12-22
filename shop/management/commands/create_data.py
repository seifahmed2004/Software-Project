# shop/management/commands/create_data.py

from django.core.management.base import BaseCommand
from shop.models import User, Product, Recipe

class Command(BaseCommand):
    help = 'Create a new user, product, and recipe'

    def handle(self, *args, **kwargs):
        # Create a new user
        user = User.objects.create(username='JohnDoe', email='john@example.com', password='password123')

        # Add a new product
        product = Product.objects.create(name='Milk', category='Dairy', price=15.00, stock=100)

        # Create a new recipe
        recipe = Recipe.objects.create(title='Eggs with Pastrami', instructions='Beat eggs and cook with pastrami.', user=user)

        # Output success message
        self.stdout.write(self.style.SUCCESS('Successfully created user, product, and recipe'))
