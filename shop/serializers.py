from django.contrib.auth.models import Group, User
from rest_framework import serializers
from .models import Item, Brand, Category, Image
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class ItemSerializer(serializers.HyperlinkedModelSerializer):
    images = serializers.SerializerMethodField(read_only=True)
    category = serializers.SerializerMethodField(read_only=True)
    brand = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Item
        fields = ['id', 'name', 'desc', 'price', 'amount', 'images', 'brand', 'category']
        # fields = '__all__'

    def get_images(self, obj):
        images = obj.image_set.all()
        serializer = ImageSerializer(images, many=True)
        return serializer.data
    
    def get_category(self, obj):
        category = obj.category
        serializer = CategorySerializer(category, many=False)
        return serializer.data

    def get_brand(self, obj):
        brand = obj.brand
        serializer = BrandSerializer(brand, many=False)
        return serializer.data


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'desc']

class BrandSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'desc']

class ImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'file']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'url', 'username', 'email', 'groups', 'is_staff']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
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
