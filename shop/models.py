from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50)
    desc = models.CharField(max_length=400)
    def __str__(self):
        return f'Category({self.name}, {self.desc})'

class Brand(models.Model):
    name = models.CharField(max_length=50)
    desc = models.CharField(max_length=400)
    def __str__(self):
        return f'Brand({self.name}, {self.desc})'

class Item(models.Model):
    name = models.CharField(max_length=50)
    desc = models.CharField(max_length=400)
    price = models.DecimalField(default=0, decimal_places=2, max_digits=12)
    amount = models.IntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f'Item({self.name}, {self.desc}, {self.price}, {self.amount}, {self.category}, {self.brand})'

class Image(models.Model):
    item = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True)
    image_file = models.ImageField(null=True, upload_to='')
    def __str__(self):
        return f'Image({self.item}, {self.image_file})'
