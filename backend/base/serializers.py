from rest_framework import serializers
from .models import GlobalSiteContent

class GlobalSiteContentSerializer(serializers.ModelSerializer):
  image = serializers.SerializerMethodField()
  class Meta:
    model = GlobalSiteContent
    fields = ['title', 'content', 'image', 'slug']

  def get_image(self, obj):
    request = self.context.get('request')
    if obj.image:
        if request:
            return request.build_absolute_uri(obj.image.url)
        return f'http://localhost:8000{settings.MEDIA_URL}{obj.image}'
    return f'http://localhost:8000/media/__sized__/__placeholder__/images/placeholder-crop-c0-5__0-5-200x200-70.jpg'

