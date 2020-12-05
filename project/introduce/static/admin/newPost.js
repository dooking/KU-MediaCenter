const sel = document.getElementById('tab-select')
const equipInfo = document.getElementById('equip-info')
const title = document.getElementById('js-title')
const subtitle = document.getElementById('js-subtitle')

const tabCheck = function () {
    const val = sel.options[sel.selectedIndex].value

    if (val == 3) {
        equipInfo.classList.remove('hide')
        title.setAttribute('placeholder', '품명')
        subtitle.setAttribute('placeholder', '규격')
    }
    else {
        equipInfo.classList.add('hide')
        title.setAttribute('placeholder', '제목')
        subtitle.setAttribute('placeholder', '부제목')

    }
}

sel.addEventListener('change', tabCheck)

tabCheck()