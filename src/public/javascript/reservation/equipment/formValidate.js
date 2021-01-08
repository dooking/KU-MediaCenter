function checkAll() {
  const startAMPM = document.querySelector("#startAMPM").value;
  const endAMPM = document.querySelector("#endAMPM").value;
  let selectedFromTime = parseInt(document.querySelector("#selectFromTime").value);
  let selectedToTime = parseInt(document.querySelector("#selectToTime").value);
  selectedFromTime = startAMPM == "am" ? selectedFromTime : selectedFromTime + 12;
  selectedToTime = endAMPM == "am" ? selectedToTime : selectedToTime + 12;
  try {
    if (!checkList()) {
      throw new Error("대여 장비 목록이 존재하지 않습니다");
    }
    if (!checkTime(selectedFromTime, selectedToTime)) {
      throw new Error("대여 시간이 빌리는 시간보다 빠릅니다");
    }
    if (!validateTime(selectedFromTime, selectedToTime)){
      throw new Error("대여 시간은 오전 9시부터 오후 5시까지입니다");
    }
    if (!checkStock(selectedFromTime, selectedToTime).result) {
      throw new Error(`${checkStock().err} 장비를 예약할 수 없습니다`);
    } 
    else {
      return true;
    }
  } catch (err) {
    alert(err.message);
    return false;
  }
}

// 대여 목록이 비어 있을 때
function checkList() {
  return sessionStorage.length !== 0;
}

// 반납 시간이 대여 시간보다 빠를 때
function checkTime(fromTime, toTime) {
  if ($fromDate.value === $toDate.value && fromTime >= toTime) {
    return false;
  }
  return true;
}

// 9시 ~ 5시 대여가능
function validateTime(fromTime, toTime) {
  if (fromTime < 9 || toTime > 17) {
    return false;
  }
  return true;
}

function checkStock(fromTime, toTime) {
    for(let i=0; i<sessionStorage.length; i++) {
        const equipment = sessionStorage.key(i);
        const count = sessionStorage.getItem(equipment)
        if(!findStock(equipment, count, fromTime, toTime)){
            return { result: false, err: equipment };
        }
    }
  return { result: true };
}

function findStock(equipment, count, fromTime, toTime) {
  const stockLists = equipmentStock.get(equipment);
  let check = true;
  if ($fromDate.value == $toDate.value) {
    stockLists.slice(fromTime, toTime).some((stock) => {
      const isMinus = stock - count;
      if (isMinus < 0) {
        check = false;
      }
    });
  } else {
    stockLists.slice(fromTime, toTime + 23).some((stock) => {
      const isMinus = stock - count;
      if (isMinus < 0) {
        check = false;
      }
    });
  }
  return check;
}
