let tempList = new Map();

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

function radioHandler(cb) {
  const borrowList = document.querySelectorAll("li");
  const borrowClass = document.querySelector(".borrow_list");
  const addItem = document.createElement("li");
  let check = 0;
  let index = 0;
  for (let i = 0; i < borrowList.length; i++) {
    if (borrowList[i].className === "camera") {
      console.log("Cb.value : ", cb.value);
      console.log("여기 : ", borrowList[i].textContent);

      if (
        cb.value ===
        borrowList[i].textContent.slice(0, borrowList[i].textContent.length - 3)
      ) {
        check = 2;
      } else {
        check = 1;
      }
      index = i;
      break;
    }
  }
  // 다른 종류 선택할 때
  if (check === 1) {
    borrowList[index].textContent = cb.value + " " + "1개";
    tempList.set(cb.id, cb.value);
  }
  // 같은 종류 선택할 때
  else if (check === 2) {
    borrowClass.removeChild(borrowList[index]);
    cb.checked = false;
    tempList.delete(cb.id);
  } else {
    addItem.setAttribute("class", "camera");
    addItem.textContent = cb.value + " " + "1개";
    borrowClass.appendChild(addItem);
    tempList.set(cb.id, cb.value);
  }
}
function checkHandler(cb) {
  const borrowList = document.querySelectorAll("li");
  const borrowClass = document.querySelector(".borrow_list");
  const addItem = document.createElement("li");
  let check = false;
  let index = 0;
  for (let i = 0; i < borrowList.length; i++) {
    if (borrowList[i].className === `${cb.id}`) {
      check = true;
      index = i;
      break;
    }
  }
  if (check) {
    borrowClass.removeChild(borrowList[index]);
    tempList.delete(cb.value);
  } else {
    addItem.setAttribute("class", `${cb.id}`);
    addItem.textContent = cb.value + " " + "1개";
    borrowClass.appendChild(addItem);
    tempList.set(cb.value, "1");
  }
}

function numberHandler(cb) {
  const borrowClass = document.querySelector(".borrow_list");
  const borrowList = document.querySelectorAll("li");
  const addItem = document.createElement("li");
  let check = false;
  let index = 0;
  for (let i = 0; i < borrowList.length; i++) {
    if (borrowList[i].className === `${cb.id}`) {
      check = true;
      index = i;
      break;
    }
  }
  // 해당 값이 0일 때
  if (check && cb.value == 0) {
    borrowClass.removeChild(borrowList[index]);
    tempList.delete(cb.id);
    cb.classList.toggle("none");
    const etc = document.querySelector(`.etc${cb.dataset.pk}`);
    etc.checked = false;
  } else {
    // 해당 값이 이미 있을 때
    if (check) {
      borrowList[index].textContent = cb.id + " " + cb.value + "개";
      tempList.set(cb.id, cb.value);
    } else {
      addItem.setAttribute("class", `${cb.id}`);
      addItem.textContent = cb.id + " " + cb.value + "개";
      borrowClass.appendChild(addItem);
      tempList.set(cb.id, cb.value);
    }
  }
}

function etcHandler(cb) {
  const borrowClass = document.querySelector(".borrow_list");
  const borrowList = document.querySelectorAll("li");
  const addItem = document.createElement("li");
  const pk = cb.dataset.pk;
  const countSelect = document.querySelector(`.select${pk}`);
  let index = 0;
  for (let i = 0; i < borrowList.length; i++) {
    if (borrowList[i].className === `${countSelect.id}`) {
      index = i;
      break;
    }
  }
  if (countSelect.classList.contains("none")) {
    countSelect.classList.remove("none");
    countSelect[1].selected = true;
    if (countSelect.value != 0) {
      addItem.setAttribute("class", `${countSelect.id}`);
      addItem.textContent = countSelect.id + " " + countSelect.value + "개";
      borrowClass.appendChild(addItem);
      tempList.set(countSelect.id, countSelect.value);
    }
  } else {
    countSelect.classList.add("none");
    borrowClass.removeChild(borrowList[index]);
    tempList.delete(countSelect.id);
  }
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
