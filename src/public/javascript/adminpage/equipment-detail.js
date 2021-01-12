function makeCode(qrDiv) {
  const category = document.querySelector(".category").value;
  const kind = document.querySelector(".kind").value;
  const name = document.querySelector(".name").value;
  const serial_number = document.querySelector(".serial_number").value;

  const newEquipment = `${category}^^${kind}^^${name}^^${serial_number}`;

  new QRCode(qrDiv, {
    text: newEquipment,
    width: 100,
    height: 100,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  return true;
}

const qrDiv = document.querySelector('#qrcode');
const result = makeCode(qrDiv);