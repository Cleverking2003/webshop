"""
ASGI config for ckshop_2 project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ckshop_2.settings')
django.setup()

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from shop.urls import ws_urlpatterns


application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': URLRouter(ws_urlpatterns)
})
