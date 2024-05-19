import json
from channels.generic.websocket import WebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Item
from django.contrib.auth.models import User

class ShopConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        async_to_sync(self.channel_layer.group_add)("notif", self.channel_name)

    def receive(self, text_data):
        async_to_sync(self.channel_layer.group_send)("notif", {
                "type": "chat.message",
                "text": text_data,
            },)
        
    def chat_message(self, event):
        data = json.loads(event['text'])
        item = Item.objects.get(pk=data['item']).name
        user = User.objects.get(pk=data['user']).username
        self.send(text_data=f"{user} купил {item}!")

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)("notif", self.channel_name)
