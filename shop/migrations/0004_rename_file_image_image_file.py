# Generated by Django 4.2.11 on 2024-05-18 08:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0003_alter_image_item_alter_item_brand_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='image',
            old_name='file',
            new_name='image_file',
        ),
    ]