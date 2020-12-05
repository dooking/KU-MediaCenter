from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

# Create your models here.

# 탭 관리


class Tab(models.Model):
    tabnum = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.title


# 관리 모델 -글 작성


class Post(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, blank=True)
    content = models.TextField(null=True, blank=True)
    tab = models.ForeignKey(
        Tab, on_delete=models.CASCADE, related_name="posts")

    # for 장비소개
    equip_type = models.CharField(max_length=100, null=True, blank=True)
    count = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.title


# 이미지 저장 위치 지정
def path_image_path(instance, filename):
    return f"img/{instance.post.tab.title}/{instance.post.title}/{filename}"


# 해당 글에 이미지 업로드
class Image(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="images")
    file = ProcessedImageField(upload_to=path_image_path, format="JPEG")

    def __str__(self):
        return self.post.title
