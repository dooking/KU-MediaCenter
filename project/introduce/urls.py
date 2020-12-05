from django.contrib import admin
from django.urls import path, include
from introduce import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    # 메인페이지
    path("", views.home, name="home"),
    # 소개 페이지
    path("tab/<int:tabnum>", views.tab, name="tab"),
    # 관리자 페이지 --소개페이지 관리
    path("introduce_admin/", views.admin_index, name="admin_index"),
    # 탭관리
    path("introduce_admin/adminTab/", views.adminTab, name="adminTab"),
    path("introduce_admin/editTab/<int:tabnum>", views.editTab, name="editTab"),
    # 글관리
    path("introduce_admin/adminPost/", views.adminPost, name="adminPost"),
    path("introduce_admin/getPost/", views.getPost, name="getPost"),
    path("introduce_admin/newPost/", views.newPost, name="newPost"),
    path(
        "introduce_admin/detailPost/<int:post_pk>", views.detailPost, name="detailPost"
    ),
    path("introduce_admin/editPost/<int:post_pk>", views.editPost, name="editPost"),
    path(
        "introduce_admin/deletePost/<int:post_pk>", views.deletePost, name="deletePost"
    ),
    path("introerror/", views.introerror, name="introerror"),
]

# 미디어 파일을 주소로 설정하는 코드
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
