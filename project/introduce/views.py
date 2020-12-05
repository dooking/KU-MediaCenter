from django.shortcuts import render, redirect
from .models import Post, Tab, Image
import datetime
from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.db import transaction
from .forms import ImageForm, ImageFormSet
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from app.models import Profile

# Create your views here.


def introerror(request):
    return render(request, "introerror.html")


# 메인페이지
def home(request):
    try:
        tabs = Tab.objects.all()
        return render(request, "home.html", {"tabs": tabs})
    except:
        return redirect("introerror")


# 소개 메인 페이지
def tab(request, tabnum):
    try:
        tabs = Tab.objects.all()

        if tabnum == 1:
            # 교육매체실
            tab1 = Tab.objects.get(tabnum=1)
            posts = Post.objects.filter(tab=tab1)

            post_1 = posts[0]
            post_2 = posts[1]

            return render(
                request, "tab1.html", {"tabs": tabs, "post_1": post_1, "post_2": post_2}
            )
        elif tabnum == 2:
            # 시설 소개
            tab2 = Tab.objects.get(tabnum=2)
            posts = Post.objects.filter(tab=tab2)

            return render(
                request, "tab2.html", {"tabs": tabs, "posts": posts, "tab": tab2}
            )
        elif tabnum == 3:
            # 장비소개
            tab3 = Tab.objects.get(tabnum=3)
            posts = Post.objects.filter(tab=tab3)
            equip_type_list = []
            for p in posts:
                if p.equip_type not in equip_type_list:
                    equip_type_list.append(p.equip_type)

            posts_to_send = []
            for e in equip_type_list:
                e_post = {}
                e_post["equip_type"] = e

                e_post["posts"] = posts.filter(equip_type=e)
                posts_to_send.append(e_post)

            return render(
                request,
                "tab3.html",
                {"tabs": tabs, "tab": tab3, "posts": posts_to_send},
            )
        elif tabnum == 4:
            # 교육매체실&미디어학부 시너지
            tab4 = Tab.objects.get(tabnum=4)
            posts = Post.objects.filter(tab=tab4)

            return render(
                request, "tab4.html", {"tabs": tabs, "posts": posts, "tab": tab4}
            )
        elif tabnum == 5:
            # 4대 핵심 콘텐츠
            tab5 = Tab.objects.get(tabnum=5)
            posts = Post.objects.filter(tab=tab5)

            return render(
                request, "tab5.html", {"tabs": tabs, "posts": posts, "tab": tab5}
            )
        elif tabnum == 6:
            # 각 부서와의 협업 및 영상지원
            tab6 = Tab.objects.get(tabnum=6)
            posts = Post.objects.filter(tab=tab6)

            return render(
                request, "tab6.html", {"tabs": tabs, "posts": posts, "tab": tab6}
            )

        elif tabnum == 7:
            # 조직도
            tab7 = Tab.objects.get(tabnum=7)
            posts = Post.objects.filter(tab=tab7)

            return render(
                request, "tab7.html", {"tabs": tabs, "tab": tab7, "posts": posts}
            )
        else:
            # SNS
            tab8 = Tab.objects.get(tabnum=8)
            posts = Post.objects.filter(tab=tab8)
            post_1 = posts[0]
            post_2 = posts[1]
            return render(
                request,
                "tab8.html",
                {
                    "tabs": tabs,
                    "tab": tab8,
                    "posts": posts,
                    "post_1": post_1,
                    "post_2": post_2,
                },
            )
    except:
        return redirect("introerror")


# 관리자페이지


@login_required(login_url="/rent")
def admin_index(request):
    try:
        if request.user.profile.isAuth != 2:
            return render(
                request, "./admin/alert.html", {"msg": "권한이 없습니다. 관리자로 로그인해주세요."}
            )
    except:
        return redirect("admin_index")

    try:
        tabs = Tab.objects.all()
        return render(request, "./admin/admin_index.html", {"tabs": tabs})
    except:
        return redirect("introerror")


# 탭 관리
@login_required(login_url="/rent")
def adminTab(request):
    try:
        if request.user.profile.isAuth != 2:
            return render(
                request, "./admin/alert.html", {"msg": "권한이 없습니다. 관리자로 로그인해주세요."}
            )
    except:
        return redirect("adminTab")
    try:
        tabs = Tab.objects.all()

        return render(request, "./admin/adminTab.html", {"tabs": tabs})
    except:
        return redirect("introerror")


@login_required(login_url="/rent")
def editTab(request, tabnum):
    try:
        if request.user.profile.isAuth != 2:
            return render(
                request, "./admin/alert.html", {"msg": "권한이 없습니다. 관리자로 로그인해주세요."}
            )
    except:
        return redirect("editTab")
    try:
        tabs = Tab.objects.all()
        tab = Tab.objects.get(tabnum=tabnum)
        if request.method == "POST":
            tab_to_edit = Tab.objects.filter(tabnum=tabnum)

            tab_to_edit.update(
                tabnum=tabnum,
                title=request.POST["tabTitle"],
                subtitle=request.POST["tabSubtitle"],
            )

            return redirect("adminTab")
        return render(request, "./admin/editTab.html", {"tabs": tabs, "tab": tab})
    except:
        return redirect("introerror")


# 글 관리
@login_required(login_url="/rent")
def adminPost(request):
    try:
        if request.user.profile.isAuth != 2:
            return render(
                request, "./admin/alert.html", {"msg": "권한이 없습니다. 관리자로 로그인해주세요."}
            )
    except:
        return redirect("adminPost")

    try:
        tabs = Tab.objects.all()

        # posts = Post.objects.all().order_by("tab")

        return render(request, "./admin/adminPost.html", {"tabs": tabs})
    except:
        return redirect("introerror")


# tab에 맞는 posts queryset return
@csrf_exempt
def getPost(request):
    try:
        request_body = json.loads(request.body)

        tabnum = request_body["tabnum"]

        tab = Tab.objects.get(tabnum=tabnum)

        posts = Post.objects.filter(tab=tab)

        post_list = []

        for p in posts:
            post_info = {}
            post_info["tab"] = p.tab.title
            post_info["id"] = p.pk
            post_info["title"] = p.title
            post_info["subtitle"] = p.subtitle
            post_list.append(post_info)

        response = {"posts": post_list}

        return HttpResponse(json.dumps(response))
    except:
        return redirect("introerror")


@login_required(login_url="/rent")
def detailPost(request, post_pk):
    try:
        if request.user.profile.isAuth != 2:
            return render(
                request, "./admin/alert.html", {"msg": "권한이 없습니다. 관리자로 로그인해주세요."}
            )
    except:
        return redirect("detailPost")

    try:
        tabs = Tab.objects.all()

        post = Post.objects.get(pk=post_pk)

        return render(request, "./admin/detailPost.html", {"post": post, "tabs": tabs})
    except:
        return redirect("introerror")


@login_required(login_url="/rent")
def editPost(request, post_pk):
    try:
        if request.user.profile.isAuth != 2:
            return render(
                request, "./admin/alert.html", {"msg": "권한이 없습니다. 관리자로 로그인해주세요."}
            )
    except:
        return redirect("editPost")

    try:
        post = Post.objects.get(pk=post_pk)
        tabs = Tab.objects.all()

        # 이미지 가져오기
        images = Image.objects.filter(post=post)

        print(images)
        image_formset = ImageFormSet(instance=post)

        if request.method == "POST":
            tab = Tab.objects.get(tabnum=request.POST["tab"])
            post_to_edit = Post.objects.get(pk=post_pk)

            post_to_edit.title = request.POST["title"]
            post_to_edit.subtitle = request.POST["subtitle"]
            post_to_edit.content = request.POST["content"]
            post_to_edit.tab = tab

            # 장비일경우
            if tab.tabnum == 3:
                post_to_edit.equip_type = request.POST["equip_type"]
                post_to_edit.count = request.POST["count"]

            image_formset = ImageFormSet(
                request.POST, request.FILES, instance=post_to_edit
            )

            if image_formset.is_valid():
                with transaction.atomic():
                    post_to_edit.save()

                    image_formset.instance = post_to_edit

                    image_formset.save()

                    post_pk = post_to_edit.pk
                return redirect("detailPost", post_pk)
        return render(
            request,
            "./admin/editPost.html",
            {"post": post, "tabs": tabs, "image_formset": image_formset},
        )
    except:
        return redirect("introerror")


@login_required(login_url="/rent")
def newPost(request):
    try:
        if request.user.profile.isAuth != 2:
            return render(
                request, "./admin/alert.html", {"msg": "권한이 없습니다. 관리자로 로그인해주세요."}
            )
    except:
        return redirect("newPost")

    try:
        tabs = Tab.objects.all()
        image_formset = ImageFormSet()

        if request.method == "POST":
            tab = Tab.objects.get(tabnum=request.POST["tab"])

            if tab.tabnum == 3:
                new_post = Post(
                    title=request.POST["title"],
                    subtitle=request.POST["subtitle"],
                    content=request.POST["content"],
                    tab=tab,
                    # 장비일 경우
                    equip_type=request.POST["equip_type"],
                    count=request.POST["count"],
                )
            else:
                new_post = Post(
                    title=request.POST["title"],
                    subtitle=request.POST["subtitle"],
                    content=request.POST["content"],
                    tab=tab,
                )

            # 이미지저장
            image_formset = ImageFormSet(request.POST, request.FILES)

            if image_formset.is_valid():
                with transaction.atomic():
                    new_post.save()

                    image_formset.instance = new_post
                    image_formset.save()

                    post_pk = new_post.pk
                return redirect("detailPost", post_pk)

        return render(
            request,
            "./admin/newPost.html",
            {"tabs": tabs, "image_formset": image_formset},
        )
    except:
        return redirect("introerror")


@login_required(login_url="/rent")
def deletePost(request, post_pk):
    try:
        if request.user.profile.isAuth != 2:
            return render(
                request, "./admin/alert.html", {"msg": "권한이 없습니다. 관리자로 로그인해주세요."}
            )
    except:
        return redirect("deletePost")

    try:
        post = Post.objects.get(pk=post_pk)
        post.delete()

        return redirect("adminPost")
    except:
        return redirect("introerror")
