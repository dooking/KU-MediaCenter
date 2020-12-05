from django.shortcuts import render, redirect
from .models import Profile, Equipment, Studio, EquipmentBorrow, StudioBorrow
import datetime
from django.contrib.auth.models import User
from django.contrib import auth
from django.contrib.auth.decorators import login_required

from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json

from .makeObject import *
from django.db.models import Q

def handler400(request, exception):
    return render(None, 'error.html')
def handler403(request, exception):
    return render(None, 'error.html')
def handler404(request, exception):
    return render(None, 'error.html')
def handler500(request):
    return render(None, 'error.html')

# 0 - Adming
# 1 - startpage

def main(request):
    return render(request, "1-startpage/main.html")

# 2 - Introduce


def introduce(request):
    return render(request, "2-introduce/intro.html")

@login_required(login_url = '/rent')
def check_intro_equip(request):
    return render(request, "2-introduce/check_intro_equip.html")

@login_required(login_url = '/rent')
def check_intro_studio(request):
    return render(request, "2-introduce/check_intro_studio.html")

# 3 - Borrow


@csrf_exempt
@login_required(login_url = '/rent')
def device_info(request):
    return render(request, "3-borrow/device_info.html")

@login_required(login_url = '/rent')
def borrow_step1(request):
    try:
        now = datetime.datetime.now()
        nowDate = now.strftime("%Y-%m-%d").replace("-", "")
        nextDay = (now + datetime.timedelta(1)).strftime("%Y-%m-%d")
        year, month, day = now.strftime("%Y-%m-%d").split("-")
        camera = (
            Equipment.objects.filter(equipType="카메라", isExist=True)
            .values("equipType")
            .distinct()
        )
        subCamera = (
            Equipment.objects.filter(equipType="카메라 보조 장치", isExist=True)
            .values("equipType")
            .distinct()
        )
        record = (
            Equipment.objects.filter(equipType="녹음 장비", isExist=True)
            .values("equipType")
            .distinct()
        )
        light = (
            Equipment.objects.filter(equipType="조명", isExist=True)
            .values("equipType")
            .distinct()
        )
        etc = (
            Equipment.objects.filter(equipType="기타 부속", isExist=True)
            .values("equipType")
            .distinct()
        )
        # cameraObject = makeDictionary(camera, nowDate)
        otherObject = (
            ResultObject(camera, nowDate, True)
            + ResultObject(subCamera, nowDate, True)
            + ResultObject(record, nowDate, True)
            + ResultObject(light, nowDate, True)
            + ResultObject(etc, nowDate, True)
        )

        if request.method == "POST":
            selectDate = "".join(request.POST["selectDate"]).replace("-", "")
            year, month, day = "".join(request.POST["selectDate"]).split("-")
            nextDay = (
                datetime.datetime(int(year), int(month), int(day))
                + datetime.timedelta(1)
            ).strftime("%Y-%m-%d")
            # cameraObject = makeDictionary(camera, selectDate)
            otherObject = (
                ResultObject(camera, selectDate, True)
                + ResultObject(subCamera, selectDate, True)
                + ResultObject(record, selectDate, True)
                + ResultObject(light, selectDate, True)
                + ResultObject(etc, selectDate, True)
            )
            return render(
                request,
                "3-borrow/step1.html",
                {
                    "otherObjects": otherObject,
                    "year": year,
                    "month": month,
                    "day": day,
                    "calendar": year + "-" + month + "-" + day,
                    "nextDay": nextDay,
                },
            )
        return render(
            request,
            "3-borrow/step1.html",
            {
                "otherObjects": otherObject,
                "year": year,
                "month": month,
                "day": day,
                "calendar": year + "-" + month + "-" + day,
                "nextDay": nextDay,
            },
        )
    except:
        return redirect("error")

@login_required(login_url = '/rent')
def borrow_step2(request):
    if request.method == "POST":
    
        borrowList = "".join(request.POST["resultBorrow"]).split("//")
        borrowList.pop()
        fromTime = "".join(request.POST["fromTime"])
        toTime = "".join(request.POST["toTime"])
        fromDate = "".join(request.POST["fromDate"])
        toDate = "".join(request.POST["toDate"])
        return render(
            request,
            "3-borrow/step2.html",
            {
                "borrowLists": borrowList,
                "fromTime": fromTime,
                "fromDate": fromDate,
                "toTime": toTime,
                "toDate": toDate,
            },
        )
    else:
        return redirect("error")

@login_required(login_url = '/rent')
def borrow_finish(request):
    if request.method == "POST":
        EquipmentBorrow.objects.create(
            username=Profile.objects.get(username=request.user),
            equipment="".join(request.POST["borrowList"]),
            toDate="".join(request.POST["toDate"]).replace("-", ""),
            toDateTime=int(("".join(request.POST["toTime"]))[:2]),
            fromDate="".join(request.POST["fromDate"]).replace("-", ""),
            fromDateTime=int(("".join(request.POST["fromTime"]))[:2]),
            group="".join(request.POST["group"]),
            phone="".join(request.POST["phone"]),
            purpose="".join(request.POST["purpose"]),
            auth="".join(request.POST["auth"]),
            remark="".join(request.POST["remark"]),
            borrowState=0,
        )
        return redirect("mypage")
    else:
        return redirect("error")

@login_required(login_url = '/rent')
def studio_info(request):
    return render(request, "4-studio/studio_info.html")

@login_required(login_url = '/rent')
def studio_step1(request):
    now = datetime.datetime.now()
    nowDate = now.strftime("%Y-%m-%d").replace("-", "")
    nextDay = (now + datetime.timedelta(1)).strftime("%Y-%m-%d")
    year, month, day = now.strftime("%Y-%m-%d").split("-")
    editorialSudio = (
        Studio.objects.filter(studioType="편집실", isExist=True)
        .values("studioType")
        .distinct()
    )
    soundStudio = (
        Studio.objects.filter(studioType="사운드 스튜디오", isExist=True)
        .values("studioType")
        .distinct()
    )
    sbsStudio = (
        Studio.objects.filter(studioType="SBS 스튜디오", isExist=True)
        .values("studioType")
        .distinct()
    )
    otherObject = (
        ResultObject(editorialSudio, nowDate, False)
        + ResultObject(soundStudio, nowDate, False)
        + ResultObject(sbsStudio, nowDate, False)
    )

    if request.method == "POST":
        selectDate = "".join(request.POST["selectDate"]).replace("-", "")
        year, month, day = "".join(request.POST["selectDate"]).split("-")
        nextDay = (
            datetime.datetime(int(year), int(month), int(day)
                              ) + datetime.timedelta(1)
        ).strftime("%Y-%m-%d")
        otherObject = (
            ResultObject(editorialSudio, selectDate, False)
            + ResultObject(soundStudio, selectDate, False)
            + ResultObject(sbsStudio, selectDate, False)
        )
        return render(
            request,
            "4-studio/step1.html",
            {
                "otherObjects": otherObject,
                "year": year,
                "month": month,
                "day": day,
                "calendar": year + "-" + month + "-" + day,
                "nextDay": nextDay,
            },
        )

    return render(
        request,
        "4-studio/step1.html",
        {
            "otherObjects": otherObject,
            "year": year,
            "month": month,
            "day": day,
            "calendar": year + "-" + month + "-" + day,
            "nextDay": nextDay,
        },
    )

@login_required(login_url = '/rent')
def studio_step2(request):
    if request.method == "POST":
        borrowList = "".join(request.POST["resultBorrow"]).split("//")
        borrowList.pop()
        fromTime = "".join(request.POST["fromTime"])
        toTime = "".join(request.POST["toTime"])
        fromDate = "".join(request.POST["fromDate"])
        toDate = "".join(request.POST["toDate"])
        return render(
            request,
            "4-studio/step2.html",
            {
                "borrowLists": borrowList,
                "fromTime": fromTime,
                "fromDate": fromDate,
                "toTime": toTime,
                "toDate": toDate,
            },
        )
    else:
        return redirect("error")

@login_required(login_url = '/rent')
def studio_finish(request):
    if request.method == "POST":
        borrowLists = (
            (request.POST["borrowList"])
            .replace("'", "")
            .replace("[", "")
            .replace("]", "")
            .split(",")
        )
        studio = ""
        for borrowList in borrowLists:
            # 편집실 1번 PC => 1번 PC
            if "편집실" in borrowList:
                studio += borrowList[4:] + "//"
            else:
                studio += borrowList + "//"
        StudioBorrow.objects.create(
            username=Profile.objects.get(username=request.user),
            studio=studio,
            fromDate="".join(request.POST["fromDate"]).replace("-", ""),
            fromDateTime=int(("".join(request.POST["fromTime"]))[:2]),
            toDate="".join(request.POST["toDate"]).replace("-", ""),
            toDateTime=int(("".join(request.POST["toTime"]))[:2]),
            group="".join(request.POST["group"]),
            phone="".join(request.POST["phone"]),
            purpose="".join(request.POST["purpose"]),
            auth="".join(request.POST["auth"]),
            remark="".join(request.POST["remark"]),
            studioState=0,
        )
        return redirect("mypage")
    else:
        return redirect("error")


# 5 - mypage
@login_required(login_url = '/rent')
def mypage(request):
    Equip_now = makeListsEquip(
        EquipmentBorrow.objects.filter(
            Q(username=Profile.objects.get(username=request.user)),
            ~Q(borrowState=3),
            ~Q(borrowState=-1),
        )
    )

    Studio_now = makeListsStudio(
        StudioBorrow.objects.filter(
            Q(username=Profile.objects.get(username=request.user)),
            ~Q(studioState=2),
            ~Q(studioState=-1),
        )
    )
    return render(
        request,
        "5-mypage/mypage.html",
        {"Equip_now": Equip_now, "Studio_now": Studio_now},
    )


# 지난예약내역
@login_required(login_url = '/rent')
def lastReservation(request):
    Equip_last = makeListsEquip(
        EquipmentBorrow.objects.filter(
            Q(username=Profile.objects.get(username=request.user)),
            (Q(borrowState=3) | Q(borrowState=-1)),
        )
    )

    Studio_last = makeListsStudio(
        StudioBorrow.objects.filter(
            Q(username=Profile.objects.get(username=request.user)),
            (Q(studioState=2) | Q(studioState=-1)),
        )
    )
    return render(
        request,
        "5-mypage/lastReservation.html",
        {"Equip_last": Equip_last, "Studio_last": Studio_last},
    )


# 장비 예약 취소
@login_required(login_url = '/rent')
def cancelEquip(request,eb_pk):
    eb = EquipmentBorrow.objects.get(pk=eb_pk)
    eb.delete()

    return redirect("mypage")


# 스튜디오 예약 취소
@login_required(login_url = '/rent')
def cancelStudio(request,sb_pk):
    sb = StudioBorrow.objects.get(pk=sb_pk)
    sb.delete()

    return redirect("mypage")


def error(request):
    return render(request, "error.html")


def logout(request):
    auth.logout(request)
    return redirect("main")


# EquipmentBorrow --> list형태로
def makeListsEquip(nowState):
    results = []
    if len(nowState) > 0:
        for state in nowState:
            temp = {}

            equips = []
            equip_list = state.equipment[1:-1].replace("'", "").split(",")
            for e in equip_list:
                info = {}
                info["name"] = e.split(":")[0].strip()
                info["count"] = e.split(":")[1].strip()

                equips.append(info)

            temp["pk"] = state.pk
            temp["username"] = state.username.name
            temp["major"] = state.username.major
            temp["equips"] = equips
            temp["fromDateYear"] = state.fromDate[:4]
            temp["fromDateMonth"] = state.fromDate[4:6]
            temp["fromDateDay"] = state.fromDate[6:8]
            temp["fromDateTime"] = state.fromDateTime
            temp["toDateYear"] = state.toDate[:4]
            temp["toDateMonth"] = state.toDate[4:6]
            temp["toDateDay"] = state.toDate[6:8]
            temp["toDateTime"] = state.toDateTime
            temp["borrowState"] = state.borrowState
            results.append(temp)
    return results


# StudioBorrow --> list형태로
def makeListsStudio(nowState):
    results = []
    if len(nowState) > 0:
        for state in nowState:
            temp = {}
            studio_list = []
            for studio in (state.studio.split("// ")):
                studio = studio.replace("//","")
                if(studio[-1] == "C"):
                    studio = "편집실 "+studio
                studio_list.append(studio)
            
            #studio_list = state.studio[1:-1].replace("'", "").split(",")

            temp["pk"] = state.pk
            temp["username"] = state.username.name
            temp["major"] = state.username.major
            temp["studio"] = studio_list
            temp["fromDateYear"] = state.fromDate[:4]
            temp["fromDateMonth"] = state.fromDate[4:6]
            temp["fromDateDay"] = state.fromDate[6:8]
            temp["fromDateTime"] = state.fromDateTime
            temp["toDateYear"] = state.toDate[:4]
            temp["toDateMonth"] = state.toDate[4:6]
            temp["toDateDay"] = state.toDate[6:8]
            temp["toDateTime"] = state.toDateTime
            temp["studioState"] = state.studioState
            results.append(temp)
    return results
