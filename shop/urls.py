from django.urls import path

from . import views, consumer

urlpatterns = [
    path("", views.index, name="index"),
]

ws_urlpatterns = [
    path('ws/', consumer.ShopConsumer.as_asgi(), name='number-generator')
]
