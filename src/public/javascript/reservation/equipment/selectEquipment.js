// Check Event
function checkHandler(event) {
    const { category, name } = event.dataset;
    if(category === '기타 부속'){
      const $selectCountEl = selectEl(event, 'countSelect')
      $selectCountEl.classList.toggle('none')
    }
    if(sessionStorage.getItem(name)){
      removeList(name)
      event.checked = false;
      if(category === '기타 부속'){
        const $selectCountEl = selectEl(event, 'countSelect')
        $selectCountEl[0].selected = true
      }
      return;
    }
    if(category === '카메라') checkCamera()
    if(category !== '기타 부속') addList(name, 1)
  }
  
  // Select Event
  function etcHandler(event){
    const { category, name } = event.dataset;
    const selectValue = event.value
    if(selectValue == 0){
      const $selectCountEl = selectEl(event, 'checkbox')
      removeList(name)
      event.classList.add('none')
      $selectCountEl.checked = false;
      return;
    }
    addList(name, selectValue)
  }