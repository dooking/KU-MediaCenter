// 오후일 때  +12시간
function checkAll() {
  const $startAMPM = document.querySelector("#startAMPM").value;
  const $endAMPM = document.querySelector("#endAMPM").value;
  let $SelectFromTime = parseInt(document.querySelector("#selectFromTime").value);
  let $SelectToTime = parseInt(document.querySelector("#selectToTime").value);
  $SelectFromTime = $startAMPM == "am" ? $SelectFromTime : $SelectFromTime + 12;
  $SelectToTime = $endAMPM == "am" ? $SelectToTime : $SelectToTime + 12;
  try {
    if (!checkList()) {
      throw new Error("대여 장비 목록이 존재하지 않습니다");
    }
    if (!checkTime($SelectFromTime, $SelectToTime)) {
      throw new Error("대여 시간이 빌리는 시간보다 빠릅니다");
    }
    if (!checkStock($SelectFromTime, $SelectToTime).result) {
      throw new Error(`${checkStock().err} 예약이 이미 존재합니다`);
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
  if ($fromDate.value === $returnDate.value && fromTime >= toTime) {
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
  const checkstock = equipmentStock.get(equipment);
  let check = true;
  if ($fromDate.value == $returnDate.value) {
    checkstock.slice(fromTime, toTime).some((v) => {
      const isMinus = v - count;
      if (isMinus < 0) {
        check = false;
      }
    });
  } else {
    checkstock.slice(fromTime, toTime + 23).some((v) => {
      const isMinus = v - count;
      if (isMinus < 0) {
        check = false;
      }
    });
  }
  return check;
}
