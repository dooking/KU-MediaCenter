const btn_edit = document.querySelector(".btn_edit");
const editForm = document.querySelector("#editForm");
const btn_disabled = document.querySelector(".disabled");
const type_disabled = document.querySelector(".disabledType");
btn_edit.addEventListener("click", ({ target }) => {
  btn_disabled.removeAttribute("disabled");
  if (type_disabled) {
    type_disabled.removeAttribute("disabled");
  }
  alert("수정이 완료되었습니다");
  editForm.submit();
});
