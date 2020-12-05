const name = document.getElementById("equipmentName");
const serialNumber = document.getElementById("equipmentSerialNumber");
const type = document.getElementById("equipmentType");
const semiType = document.getElementById("equipmentSemiType");
const outputLayer = document.getElementById("outputLayer");
const equipments = document.getElementById("equipments");

const listName = document.getElementById("list_name");
const listDevice = document.getElementById("list_device");
const listPeriod = document.getElementById("list_period");
const listAuth = document.getElementById("list_auth");
const listGroup = document.getElementById("list_group");
const listEtc = document.getElementById("list_etc");

function init() {
  const htmllistDevice = document.getElementById("newlist_device");
  const equipmentList = document.getElementById("equipmentList");
  const newlistsDevice = equipmentList.value
    .slice(1, -1)
    .replace(/'/g, "")
    .replace(/ /g, "")
    .split(",");

  for (let newlistDevice of newlistsDevice) {
    let item = document.createElement("p");
    const itemAttr = newlistDevice.split(":");
    item.innerText = itemAttr[0] + "    " + itemAttr[1] + "개";
    htmllistDevice.appendChild(item);
  }

  const fromDate = document.getElementById("list_period_fromDate").value;
  const fromDateTime = document.getElementById("list_period_fromDateTime")
    .value;
  const toDate = document.getElementById("list_period_toDate").value;
  const toDateTime = document.getElementById("list_period_toDateTime").value;

  const periodFront = `${fromDate.slice(0, 4)}년 ${fromDate.slice(
    4,
    6
  )}월 ${fromDate.slice(6, 8)}일 ${fromDateTime}시`;
  const periodBack = `${toDate.slice(0, 4)}년 ${toDate.slice(
    4,
    6
  )}월 ${toDate.slice(6, 8)}일 ${toDateTime}시`;
  document.getElementById("newlist_period").innerHTML =
    periodFront + "<br/>" + periodBack;
}

document.addEventListener("DOMContentLoaded", function () {
  var video = document.createElement("video");
  var canvasElement = document.getElementById("canvas");
  var canvas = canvasElement.getContext("2d");
  var loadingMessage = document.getElementById("loadingMessage");
  var outputContainer = document.getElementById("output");
  var outputMessage = document.getElementById("outputMessage");

  function drawLine(begin, end, color) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  }

  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      video.srcObject = stream;
      video.setAttribute("playsinline", true); // iOS 사용시 전체 화면을 사용하지 않음을 전달
      video.play();
      requestAnimationFrame(tick);
    });

  function tick() {
    loadingMessage.innerText = "⌛ 스캔 기능을 활성화 중입니다.";
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      loadingMessage.hidden = true;
      canvasElement.hidden = false;
      outputContainer.hidden = false;
      // 읽어들이는 비디오 화면의 크기
      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
      var imageData = canvas.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      //QR코드 인식에 성공한 경우
      if (code) {
        // 인식한 QR코드의 영역을 감싸는 사용자에게 보여지는 테두리 생성
        drawLine(
          code.location.topLeftCorner,
          code.location.topRightCorner,
          "#FF0000"
        );
        drawLine(
          code.location.topRightCorner,
          code.location.bottomRightCorner,
          "#FF0000"
        );
        drawLine(
          code.location.bottomRightCorner,
          code.location.bottomLeftCorner,
          "#FF0000"
        );
        drawLine(
          code.location.bottomLeftCorner,
          code.location.topLeftCorner,
          "#FF0000"
        );
        //outputMessage.hidden = true;
        postFrom.parentElement.hidden = false;
        // QR코드 메시지 출력
        const result = code.data.split("^");

        name.innerText = result[0];
        serialNumber.innerText = result[1];
        type.innerText = result[2];
        semiType.innerText = result[3];
        // return을 써서 함수를 빠져나가면 QR코드 프로그램이 종료된다.
        //return;
      }
      // QR코드 인식에 실패한 경우
      else {
        //alert('다시 인식 시켜 주세요')
        outputMessage.hidden = false;
        //postFrom.parentElement.hidden = true;
      }
    }
    requestAnimationFrame(tick);
  }
});

function addEquipmentToForm() {
  if (
    name.innerText.length > 0 &&
    serialNumber.innerText.length > 0 &&
    type.innerText.length > 0 &&
    semiType.innerText.length > 0
  ) {
    let item = document.createElement("p");
    const newEquipment = `${type.innerText} ${semiType.innerText} ${name.innerText} ${serialNumber.innerText}`;
    const result = `${name.innerText}^${serialNumber.innerText}^${type.innerText}^${semiType.innerText}`;
    item.innerText = newEquipment;

    outputLayer.appendChild(item);
    if (equipments.value.length === 0) {
      equipments.value = result;
    } else {
      equipments.value = equipments.value + "@@" + result;
    }

    name.innerText = "";
    serialNumber.innerText = "";
    type.innerText = "";
    semiType.innerText = "";
  }
}
init();
