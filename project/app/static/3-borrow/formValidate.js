let fromDate;
let toDate;
let fromTime;
let toTime;

let SelectFromTime;
let SelectToTime;

// 오후일 때  +12시간
let resultBorrowString = "";

function checkAll() {
  const resultBorrow = document.getElementById("resultBorrow");
  const startAMPM = document.querySelector("#startAMPM").value;
  const endAMPM = document.querySelector("#endAMPM").value;

  fromDate = document.querySelector("#fromDate");
  toDate = document.querySelector("#toDate");
  fromTime = document.querySelector("#fromTime");
  toTime = document.querySelector("#toTime");

  SelectFromTime = parseInt(document.querySelector("#selectFromTime").value);
  SelectToTime = parseInt(document.querySelector("#selectToTime").value);
  SelectFromTime = startAMPM == "am" ? SelectFromTime : SelectFromTime + 12;
  SelectToTime = endAMPM == "am" ? SelectToTime : SelectToTime + 12;

  try {
    if (!checkList()) {
      throw new Error("대여 장비 목록이 존재하지 않습니다");
    }
    if (!checkTime().result) {
      switch (checkTime().errType) {
        case 1:
          throw new Error("대여시간이 빌리는 시간보다 빠릅니다");
          break;
        case 2:
          throw new Error("예약 시간은 오전 9시부터 오후 5시까지 입니다");
          break;
        case 3:
          throw new Error("반납 시간은 오전 9시부터 오후 5시까지 입니다");
          break;
        default:
          throw new Error("시간을 다시 선택주시길 바랍니다");
          break;
      }
    }
    if (!checkStock().result) {
      throw new Error(`${checkStock().err} 예약이 이미 존재합니다`);
    } else {
      toDate.value = returnDate.value;
      fromTime.value = SelectFromTime;
      toTime.value = SelectToTime;
      resultBorrow.value = resultBorrowString;
      return true;
    }
  } catch (err) {
    alert(err.message);
    resultBorrowString = "";
    return false;
  }
}

function checkList() {
  return tempList.size !== 0;
}

function checkTime() {
  // 반납 시간이 대여 시간보다 빠를 때
  if (fromDate.value === returnDate.value && SelectFromTime > SelectToTime) {
    return { result: false, errType: 1 };
  }
  // 예약 시간이 오전 9시 ~ 오후 5시 사이가 아닐 때
  if (SelectFromTime < 9 || SelectFromTime > 17) {
    return { result: false, errType: 2 };
  }
  // 반납 시간이 오전 9시 ~ 오후 5시 사이가 아닐 때
  if (SelectToTime < 9 || SelectToTime > 17) {
    return { result: false, errType: 3 };
  }
  return { result: true };
}

function checkStock() {
  let isCamera = false;
  for (let [key, value] of tempList.entries()) {
    if (key == "camera") {
      resultBorrowString += value + " : " + "1" + "//";
      isCamera = true;
    } else {
      resultBorrowString += key + " : " + value + "//";
      isCamera = false;
    }

    // 재고가 있는지 확인 (당일 반납 + 내일 반납)
    if (!findStock(key, value, isCamera)) {
      return { result: false, err: isCamera ? value : key };
    }
  }
  return { result: true };
}
function findStock(key, value, isCamera) {
  const checkstock = isCamera ? checkCount.get(value) : checkCount.get(key);
  let check = true;
  if (fromDate.value == returnDate.value) {
    checkstock.slice(SelectFromTime - 9, SelectToTime - 8).some((v) => {
      const isMinus = isCamera
        ? parseInt(v) - 1
        : parseInt(v) - parseInt(value);
      if (isMinus < 0) {
        check = false;
      }
    });
  } else {
    checkstock.slice(SelectFromTime - 9, SelectToTime + 1).some((v) => {
      const isMinus = isCamera ? v - 1 : v - value;
      if (isMinus < 0) {
        check = false;
      }
    });
  }
  return check;
}
