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
    if (!checkTime()) {
      throw new Error("대여시간이 빌리는 시간보다 빠릅니다");
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
    return false;
  }
  return true;
}
function checkStock() {
  let isEdit = false;
  for (let [key, value] of tempList.entries()) {
    if (key == "edit") {
      resultBorrowString += "편집실 " + value + "//";
      isEdit = true;
    } else {
      resultBorrowString += key + "//";
      isEdit = false;
    }
    // 재고가 있는지 확인 (당일 반납 + 내일 반납)
    if (!findStock(key, value, isEdit)) {
      return { result: false, err: isEdit ? "편집실 " + value : key };
    }
  }
  return { result: true };
}
function findStock(key, value, isEdit) {
  const checkstock = isEdit ? checkCount.get(value) : checkCount.get(key);
  let check = true;
  if (fromDate.value == returnDate.value) {
    checkstock.slice(SelectFromTime, SelectToTime).some((v) => {
      const isMinus = v - 1;
      if (isMinus < 0) {
        check = false;
      }
    });
  } else {
    checkstock.slice(SelectFromTime, SelectToTime + 23).some((v) => {
      const isMinus = v - 1;
      if (isMinus < 0) {
        check = false;
      }
    });
  }
  return check;
}
