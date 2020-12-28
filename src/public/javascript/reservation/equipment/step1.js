const $reservationList = document.querySelector(".reservation_list")

// CheckBox Check (Rendering)
const $checkBoxes = document.querySelectorAll("input[type=checkbox], input[type=radio]")
$checkBoxes.forEach(checkBox=>{
  const { name } = checkBox.dataset
  if(sessionStorage.getItem(name)){
    checkBox.checked = true
    addList(name, sessionStorage.getItem(name))
    if(checkBox.dataset.category === '기타 부속'){
      const $selectCountEl = selectEl(checkBox, 'countSelect')
      $selectCountEl.classList.remove('none')
      $selectCountEl[sessionStorage.getItem(name)].selected = true
    }
  }
})

// Check Event
function checkHandler(event) {
  const { category, name } = event.dataset;
  if(category === '기타 부속'){
    const $selectCountEl = selectEl(event, 'countSelect')
    $selectCountEl.classList.toggle('none')
  }
  if(sessionStorage.getItem(name)){
    removeList(name)
    event.checked = false;
    if(category === '기타 부속'){
      const $selectCountEl = selectEl(event, 'countSelect')
      $selectCountEl[0].selected = true
    }
    return;
  }
  if(category === '카메라') checkCamera()
  if(category !== '기타 부속') addList(name, 1)
}

// Select Event
function etcHandler(event){
  const { category, name } = event.dataset;
  const selectValue = event.value
  if(selectValue == 0){
    const $selectCountEl = selectEl(event, 'checkbox')
    removeList(name)
    event.classList.add('none')
    $selectCountEl.checked = false;
    return;
  }
  addList(name, selectValue)
}

//time block
for (let index = 0; index < 18; index++) {
  let blockCount = document.getElementsByClassName(String(index));
  for (let i = 0; i < blockCount.length; i++) {
    for (let j = 0; j < blockCount[i].id; j++) {
      const newDiv = document.createElement("div");
      newDiv.setAttribute("class", "time-block");
      blockCount[i].appendChild(newDiv);
    }
  }
}
