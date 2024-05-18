from django.http import HttpResponse
from .models import *
from .serializers import *
from rest_framework import permissions, viewsets, pagination, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.views import TokenObtainPairView
from django_filters import rest_framework as filters

def index(request):
    return HttpResponse("shop will be here.")

class ItemFilter(filters.FilterSet):
    name = filters.Filter(field_name='name', lookup_expr='contains')
    category = filters.NumberFilter(field_name='category__id')
    brand = filters.NumberFilter(field_name='brand__id')

    class Meta:
        model = Item
        fields = ['category__id']

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    pagination_class = pagination.PageNumberPagination
    # search_fields = ['name', 'category__id']
    filterset_class = ItemFilter

    @action(
        methods=['post'], detail=True, permission_classes=[permissions.IsAuthenticated] 
    )
    def make_purchase(self, request, pk=None):
        item = get_object_or_404(Item, id=pk)

        if item.amount < 1:
            return Response(
                {'errors': 'Товар отсутствует'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        item.amount -= 1
        item.save()
        item_serializer = ItemSerializer(item, context={'request':request})
        return HttpResponse(item_serializer.data, status=status.HTTP_200_OK)


class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
