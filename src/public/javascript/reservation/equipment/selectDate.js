const now = new Date()
const nowYear = now.getFullYear()

// 선택 날짜
const $selectYearEl = document.querySelector("#year")
const $selectMonthEl = document.querySelector("#month")
const $selectDayEl = document.querySelector("#day")

// 현재 페이지의 날짜
const selectYear = $selectYearEl.dataset.selectYear
const selectMonth = $selectMonthEl.dataset.selectMonth
const selectDay = $selectDayEl.dataset.selectDay
const selectDate = new Date(`${selectYear}`+'-'+`${selectMonth}`+'-'+`${selectDay}`)

// 기본 날짜 설정
const lastDay = checkMonth(selectMonth)
makeTimeOption($selectYearEl, false, 5)
makeTimeOption($selectMonthEl, true, 12)
makeTimeOption($selectDayEl, true, lastDay)

// 현재 페이지 날짜 선택 (default)
$selectYearEl.options[selectYear-nowYear].selected = true
$selectMonthEl.options[selectMonth-1].selected = true
$selectDayEl.options[selectDay-1].selected = true

// 날짜 선택 시 event처리
$selectYearEl.addEventListener("change",(event)=>{
    $selectMonthEl.options[0].selected = true
    $selectDayEl.options[0].selected = true
    sendForm()
})
$selectMonthEl.addEventListener("change",(event)=>{
    const month = event.target.value
    const lastDay = checkMonth(month)
    $selectDayEl.options[0].selected = true
    makeTimeOption($selectDayEl, true, lastDay)
    sendForm()
})
$selectDayEl.addEventListener("change",(event)=>{
    sendForm()
})

// 반납날짜 선택
const $fromDateEl = document.querySelector("#fromDate")
const $toDateEl = document.querySelector("#toDate")
const $selectFromTimeEl = document.querySelector("#selectFromTime")
const $selectToTimeEl = document.querySelector("#selectToTime")

$fromDateEl.value = dateFormat(selectYear,selectMonth,selectDay)
makeTimeOption($selectFromTimeEl, true, 12)
makeTimeOption($selectToTimeEl, true, 12)

const option = document.createElement("option")
const option2 = document.createElement("option")
option.text = dateFormat(selectYear,selectMonth,selectDay)
$toDateEl.add(option)

// 금요일 대여 -> 월요일 반납
if(selectDate.getDay() === 5){
    selectDate.setDate(selectDate.getDate() + 3)
    option2.text = dateFormat(selectDate.getFullYear(),selectDate.getMonth()+1,selectDate.getDate())
    $toDateEl.add(option2)
}
else{
    const {nextYear, nextMonth, nextDay } = $toDateEl.dataset
    option2.text = dateFormat(nextYear,nextMonth,nextDay)
    $toDateEl.add(option2)
}

//default
startAMPM.options[1].selected = true
endAMPM.options[1].selected = true
$selectFromTimeEl.options[0].selected = true
$selectToTimeEl.options[4].selected = true