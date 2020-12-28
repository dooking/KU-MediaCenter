const now = new Date()
const nowYear = now.getFullYear()

// 선택 날짜
const $selectYear = document.querySelector("#year")
const $selectMonth = document.querySelector("#month")
const $selectDay = document.querySelector("#day")

// 현재 페이지의 날짜
const currentYear = $selectYear.dataset.currentYear
const currentMonth = $selectMonth.dataset.currentMonth
const currentDay = $selectDay.dataset.currentDay

// 기본 날짜 설정
for (let i=0; i<5; i++){
    const option = document.createElement("option")
    option.text = nowYear+i
    $selectYear.add(option)
}
for (let i=0; i<12; i++){
    const option = document.createElement("option")
    option.text = i+1
    $selectMonth.add(option)
}
const lastDay = checkMonth(currentMonth)
for (let i=0; i<lastDay; i++){
    const option = document.createElement("option")
    option.text = i+1
    $selectDay.add(option)
}

// 현재 페이지 날짜 선택 (default)
$selectYear.options[currentYear-nowYear].selected = true
$selectMonth.options[currentMonth-1].selected = true
$selectDay.options[currentDay-1].selected = true

// 날짜 선택 시 event처리
$selectYear.addEventListener("change",(event)=>{
    $selectMonth.options[0].selected = true
    $selectDay.options[0].selected = true
})
$selectMonth.addEventListener("change",(event)=>{
    const month = event.target.value
    $selectDay.options[0].selected = true
    const lastDay = checkMonth(month)
    for (let i=0; i<lastDay; i++){
        const option = document.createElement("option")
        option.text = i+1
        $selectDay.add(option)
    }
})
$selectDay.addEventListener("change",(event)=>{
    const $selectDate = document.querySelector("#selectDate")
    const select = new Date($selectYear.value,$selectMonth.value-1,$selectDay.value,now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds())
    $selectDate.value = $selectYear.value +"-"+(parseInt($selectMonth.value) < 10 ? "0"+$selectMonth.value : $selectMonth.value) +"-"+ (parseInt($selectDay.value) < 10 ? "0"+$selectDay.value : $selectDay.value)
    if(now<=select){
        return document.sDate.submit()
    }
    return alert("오늘 날짜 이후로 선택해주세요")
})

function checkMonth(month){
    let lastDay
    if(month == 2){
        // 윤년 => 2월 29일
        const leapYear = ($selectYear.value % 4 == 0)
        lastDay = leapYear ? 29 : 28
    }
    else if(month == 4 || month == 6 || month == 9 || month == 11){
        lastDay = 30
    }
    else{
        lastDay = 31
    }        
    return lastDay
}

// 반납날짜 선택
const returnDate = document.querySelector("#returnDate")
const option = document.createElement("option")
const option2 = document.createElement("option")
option.text = currentYear +"-"+(parseInt(currentMonth) < 10 ? "0"+currentMonth : currentMonth) +"-"+ (parseInt(currentDay) < 10 ? "0"+currentDay : currentDay)
option2.text = returnDate.dataset.nextDate
returnDate.add(option)
returnDate.add(option2)

const selectFromTime = document.querySelector("#selectFromTime")
for (let i=0; i<12; i++){
    const option = document.createElement("option")
    option.text = i+1
    selectFromTime.add(option)
}

const selectToTime = document.querySelector("#selectToTime")
for (let i=0; i<12; i++){
    const option = document.createElement("option")
    option.text = i+1
    selectToTime.add(option)
}

//default
startAMPM.options[1].selected = true
endAMPM.options[1].selected = true
selectFromTime.options[0].selected = true
selectToTime.options[4].selected = true