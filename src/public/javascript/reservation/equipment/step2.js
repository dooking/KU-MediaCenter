// step1으로 이동
const $step1 = document.querySelector("#step1")
$step1.addEventListener('click',(event)=>{
    history.back()
})

// 대여 목록 불러오기
const $reservationList = document.querySelector(".reservation-list")
const $hiddenValue = document.querySelector(".hidden_value")
for(let i=0; i<sessionStorage.length; i++) {
    const equipment = sessionStorage.key(i);
    const count = sessionStorage.getItem(equipment)

    const listEl = document.createElement('li')
    listEl.textContent = equipment + ' ' + count + '대'
    listEl.setAttribute("class", `${equipment}`);
    $reservationList.appendChild(listEl)

    const inputEl = document.createElement('input')
    inputEl.value = equipment + '::' + count
    inputEl.setAttribute("type","hidden")
    inputEl.setAttribute("name","equipments")
    $hiddenValue.appendChild(inputEl)
}

function checkAll(event){
    return true;
}
