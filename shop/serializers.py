from django.contrib.auth.models import Group, User
from rest_framework import serializers, filters
from .models import Item, Brand, Category, Image
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class ItemSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    category_full = serializers.SerializerMethodField()
    brand_full = serializers.SerializerMethodField()
    class Meta:
        model = Item
        fields = '__all__'

    def get_images(self, obj):
        images = obj.image_set.all()
        serializer = ImageSerializer(images, many=True)
        return serializer.data

    def get_category_full(self, obj):
        category = obj.category
        serializer = CategorySerializer(category, many=False)
        return serializer.data

    def get_brand_full(self, obj):
        brand = obj.brand
        serializer = BrandSerializer(brand, many=False)
        return serializer.data

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'url', 'username', 'email', 'groups', 'is_staff']

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'url', 'name']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['is_staff'] = user.is_staff
        token['username'] = user.username

        return token
