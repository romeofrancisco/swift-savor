from django.db import models
import random, string, os
from django.conf import settings
from auth_api.models import User

class Category(models.Model):
    name = models.CharField(max_length=50 ,blank=False)
    image = models.ImageField(upload_to='categories')
    created = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=True, null=False)
    
    def __str__(self):
        return self.name

class Product(models.Model):
    id = models.CharField(
        max_length=10,
        primary_key=True,
        unique=True,
        editable=False
    )
    name = models.CharField(max_length=50 ,blank=False)
    image = models.ImageField(upload_to='products', max_length=255)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True )
    category_name = models.CharField(max_length=50 ,blank=True,)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=True, null=False)
    
    def save(self, *args, **kwargs):
        if not self.id:
            self.id = self.generate_random_id()
        if self.category:
            self.category_name = self.category.name
        super().save(*args, **kwargs)
    
    # Delete the image if the product is deleted
    def delete(self, *args, **kwargs):
        if self.image:
            image_path = os.path.join(settings.MEDIA_ROOT, self.image.name)
            if os.path.isfile(image_path):
                os.remove(image_path)
        super().delete(*args, **kwargs)

    @staticmethod
    def generate_random_id():
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))

class Transaction(models.Model):
    id = models.CharField(
        max_length=10,
        primary_key=True,
        unique=True,
        editable=False
    )
    cashier = models.ForeignKey(User, on_delete=models.SET_NULL, null=True )
    cashier_name = models.CharField(max_length=50 ,blank=True,)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    subTotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    date = models.DateTimeField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        if not self.id:
            self.id = self.generate_random_id()
            self.cashier_name = self.cashier.username
        super().save(*args, **kwargs)

    @staticmethod
    def generate_random_id():
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))

class OrderProduct(models.Model):
    transaction = models.ForeignKey(Transaction, related_name='orders', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    product_name = models.CharField(max_length=50, blank=True)  
    product_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    quantity = models.IntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2, null=False, default=0)
    
    # To display the product name and price even the product is deleted
    def save(self, *args, **kwargs):
        if self.product:
            self.product_name = self.product.name
            self.product_price = self.product.price
        super().save(*args, **kwargs)

class Payment(models.Model):
    transaction = models.OneToOneField(Transaction, related_name='payment', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    change = models.DecimalField(max_digits=10, decimal_places=2)
