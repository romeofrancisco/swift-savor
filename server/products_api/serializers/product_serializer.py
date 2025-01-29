from rest_framework import serializers
from ..models import Product
from .category_serializer import CategorySerializer 

class ProductSerializer(serializers.ModelSerializer):  
    created = serializers.DateTimeField(format='%B %d, %Y', required=False)
    category_name = serializers.CharField(required=False)
    
    class Meta:
        model = Product
        fields = ['id','name','image','category','category_name','price','stock','created']