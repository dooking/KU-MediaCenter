// Check Event
function checkHandler(event) {
    const { category, name } = event.dataset;
    if(category === '기타 부속'){
      const $selectCount = findSelectEl(event, 'countSelect')
      $selectCount.classList.toggle('none')
    }
    if(sessionStorage.getItem(name)){
      removeList(name)
      event.checked = false;
      if(category === '기타 부속'){
        const $selectCount = findSelectEl(event, 'countSelect')
        $selectCount[0].selected = true
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
      const $selectCount = findSelectEl(event, 'checkbox')
      removeList(name)
      event.classList.add('none')
      $selectCount.checked = false;
      return;
    }
    addList(name, selectValue)
  }