// camera는 최대 1개까지 선택 가능
function checkCamera () {
  for (const [name, count] of Object.entries(sessionStorage)) {
    const removeList = document.getElementsByClassName(`${name}`)[0]
    if(name.includes('DSLR') || name.includes('Camcorder')){
      sessionStorage.removeItem(name)
      removeList.remove()
      return;
    }
  }
}

// Etc Event
function findSelectEl(event, selector){
  const $cam_check = event.closest('.cam_check')
  const $selectCountEl = $cam_check.getElementsByClassName(`${selector}`)[0]
  return $selectCountEl;
}

// Add List
function addList(name, count){
  sessionStorage.setItem(name, count)
  const alreadyEl = document.getElementsByClassName(`${name}`)[0]
  if(alreadyEl){
    alreadyEl.textContent = name + ' ' + sessionStorage.getItem(name) + '대'
  }
  else{
    const listEl = document.createElement('li')
    listEl.textContent = name + ' ' + sessionStorage.getItem(name) + '대'
    listEl.setAttribute("class", `${name}`);
    $reservationList.appendChild(listEl)
  }
  return;
}

// remove List
function removeList(name){
  sessionStorage.removeItem(name)
  const listEl = document.getElementsByClassName(`${name}`)[0]
  listEl.remove()
  return;
}

// YYYY-MM-DD Format
function dateFormat(year,month,day){
  return year +"-"+(parseInt(month) < 10 ? "0"+month : month) +"-"+ (parseInt(day) < 10 ? "0"+ day : day)
}

// Search SelectDate
function sendForm(){
  const $selectDate = document.querySelector("#selectDate")
  const select = new Date(`${$selectYearEl.value}`+'-'+`${$selectMonthEl.value}`+'-'+`${$selectDayEl.value}`)
  $selectDate.value = dateFormat($selectYearEl.value,$selectMonthEl.value,$selectDayEl.value)
  if(now<=select){
    return document.sDate.submit()
  }
  return alert("오늘 날짜 이후로 선택해주세요")
}

// Dropdown
function hide(event) {
  const hide = event.nextElementSibling;
  if (hide.classList.contains("mystyle")) {
    hide.classList.remove("mystyle");
    event.childNodes[3].innerText = "▲";
  } else {
    hide.classList.add("mystyle");
    event.childNodes[3].innerText = "▼";
  }
}

// 윤년 확인
function checkMonth(month) {
  let lastDay
  if(month == 2){
      // 윤년 => 2월 29일
      const leapYear = ($selectYearEl.value % 4 == 0)
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

// 시간 선택 옵션 만들기
function makeTimeOption(selectEl, isYear, length) {
  for (let i=0; i<length; i++){
    const option = document.createElement("option")
    option.text = isYear ? i+1 : nowYear+i
    selectEl.add(option)
  }
}