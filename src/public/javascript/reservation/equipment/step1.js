const $reservationList = document.querySelector(".reservation_list")

// CheckBox Check (Rendering)
const $checkBoxes = document.querySelectorAll("input[type=checkbox]")
$checkBoxes.forEach(checkBox=>{
  const { name } = checkBox.dataset
  if(sessionStorage.getItem(name)){
    checkBox.checked = true
  }
})

// Check Event
function checkHandler(event) {
  const { category, name } = event.dataset;
  if(sessionStorage.getItem(name)){
    sessionStorage.removeItem(name)
    event.checked = false;
    return;
  }
  if(category === '카메라') checkCamera()
  
  sessionStorage.setItem(name, 1)
  const addList = document.createElement('li')
  addList.textContent = name + ' ' + sessionStorage.getItem(name) + '대'
  addList.setAttribute("class", `${name}`);
  $reservationList.appendChild(addList)
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
