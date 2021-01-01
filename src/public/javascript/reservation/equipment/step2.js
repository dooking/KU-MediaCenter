// step1으로 이동
const $step1El = document.querySelector("#step1")
$step1El.addEventListener('click',(event)=>{
    history.back()
})

// 대여 목록 불러오기
const $reservationList = document.querySelector(".reservation-list")
for(let i=0; i<sessionStorage.length; i++) {
    const equipment = sessionStorage.key(i);
    const count = sessionStorage.getItem(equipment)

    const listEl = document.createElement('li')
    listEl.textContent = equipment + ' ' + sessionStorage.getItem(equipment) + '대'
    listEl.setAttribute("class", `${equipment}`);
    $reservationList.appendChild(listEl)
}