const now = new Date()
const nowYear = now.getFullYear()

// 선택 날짜
const $selectYear = document.querySelector("#year")
const $selectMonth = document.querySelector("#month")
const $selectDay = document.querySelector("#day")

// 현재 페이지의 날짜
const selectedYear = $selectYear.dataset.selectYear
const selectedMonth = $selectMonth.dataset.selectMonth
const selectedDay = $selectDay.dataset.selectDay
const selectedDate = new Date(`${selectedYear}`+'-'+`${selectedMonth}`+'-'+`${selectedDay}`)

// 기본 날짜 설정
const lastDay = checkMonth(selectedMonth)
makeTimeOption($selectYear, false, 5)
makeTimeOption($selectMonth, true, 12)
makeTimeOption($selectDay, true, lastDay)

// 현재 페이지 날짜 선택 (default)
$selectYear.options[selectedYear-nowYear].selected = true
$selectMonth.options[selectedMonth-1].selected = true
$selectDay.options[selectedDay-1].selected = true

// 날짜 선택 시 event처리
$selectYear.addEventListener("change",(event)=>{
    $selectMonth.options[0].selected = true
    $selectDay.options[0].selected = true
    sendForm()
})
$selectMonth.addEventListener("change",(event)=>{
    const month = event.target.value
    const lastDay = checkMonth(month)
    $selectDay.options[0].selected = true
    makeTimeOption($selectDay, true, lastDay)
    sendForm()
})
$selectDay.addEventListener("change",(event)=>{
    sendForm()
})

// 반납날짜 선택
const $fromDate = document.querySelector("#fromDate")
const $toDate = document.querySelector("#toDate")
const $selectFromTime = document.querySelector("#selectFromTime")
const $selectToTime = document.querySelector("#selectToTime")

$fromDate.value = dateFormat(selectedYear,selectedMonth,selectedDay)
makeTimeOption($selectFromTime, true, 12)
makeTimeOption($selectToTime, true, 12)

const option = document.createElement("option")
const option2 = document.createElement("option")
option.text = dateFormat(selectedYear,selectedMonth,selectedDay)
$toDate.add(option)

// 금요일 대여 -> 월요일 반납
if(selectedDate.getDay() === 5){
    selectedDate.setDate(selectedDate.getDate() + 3)
    option2.text = dateFormat(selectedDate.getFullYear(),selectedDate.getMonth()+1,selectedDate.getDate())
    $toDateEl.add(option2)
}
else{
    const {nextYear, nextMonth, nextDay } = $toDate.dataset
    option2.text = dateFormat(nextYear,nextMonth,nextDay)
    $toDate.add(option2)
}


//default
startAMPM.options[1].selected = true
endAMPM.options[1].selected = true
$selectFromTime.options[0].selected = true
$selectToTime.options[4].selected = true