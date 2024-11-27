from django.db import models
# from versatileimagefield.fields import VersatileImageField, PPOIField
# from versatileimagefield.placeholder import OnStoragePlaceholderImage
# from versatileimagefield.image_warmer import VersatileImageFieldWarmer
from django.utils.timezone import timezone, datetime
from django.utils.safestring import mark_safe
from django.utils.html import escape
from django.db.models.signals import pre_save
from django.utils.text import slugify
from cloudinary.models import CloudinaryField
# from cloudinary_storage.storage import get_storage_class

class GlobalSiteContent(models.Model):
    title = models.TextField(null=False, max_length=100)
    slug = models.TextField(null=False, blank=True, unique=True, max_length=120)
    content = models.TextField(null=False, max_length=3000)
    # image = VersatileImageField(
    #     'Image',
    #     upload_to='images/globalContent/',
    #     blank=True,
    #     placeholder_image=OnStoragePlaceholderImage(
    #     path='images/placeholder.jpg')
    # )
    # image = models.ImageField(upload_to='globalContent/', blank=True, null=True)
    image = CloudinaryField('image', blank=True, null=True)

    #   image = CloudinaryField('image', upload_to='images/globalContent/', blank=True)
    #   placeholder_image = CloudinaryField('placeholder', path='images/placeholder.jpg')
    created_at = models.TimeField(default=datetime.now)

#Make slug for product and if slug exists recursively make a new slug with id appeneded
def create_global_content_slug(instance, new_slug=None):
    slug = slugify(instance.title)
    if new_slug is not None:
        slug = new_slug
    qs = GlobalSiteContent.objects.filter(slug=slug).order_by('-id')
    exists = qs.exists()
    if exists:
        new_slug = f"{slug}-{qs.first().id}"
        return create_global_content_slug(instance, new_slug=new_slug)
    return slug

def pre_save_global_content_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_global_content_slug(instance)

pre_save.connect(pre_save_global_content_receiver, sender=GlobalSiteContent)

