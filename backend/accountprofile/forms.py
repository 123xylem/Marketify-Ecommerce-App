from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import CustomAccountProfile


class CustomAccountProfileCreationForm(UserCreationForm):

    class Meta:
        model = CustomAccountProfile
        fields = ("email",)


class CustomAccountProfileChangeForm(UserChangeForm):

    class Meta:
        model = CustomAccountProfile
        fields = ("email",)
