from django import forms
from introduce.models import Post, Image


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ["tab", "title", "subtitle", "content"]


class ImageForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = [
            "file",
        ]


ImageFormSet = forms.inlineformset_factory(
    Post, Image, form=ImageForm, extra=2, can_delete=True
)
