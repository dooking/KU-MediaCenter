// 유저 페널티 변경 적용
function penaltyClick(event){
    const { userId } = event.dataset
    const changedPenaltyValue = event.previousElementSibling?.value
    axios({
        method: 'post',
        url: `/admin/manage/user/penalty/${userId}`,
        data: {
            changedPenaltyValue
        } 
      })
        .then(response=>{
            const { result } = response?.data
            if(result){
                alert('벌점이 적용되었습니다')
            }
            else{
                alert('벌점 적용 과정에서 문제가 발생하였습니다.')
            }
            return window.location.replace("");
        })
        .catch(error=>{
            alert(error)
            return window.location.replace("");
        })
}

// 관리자 권한 변경 적용
function authClick(event){
    const { userId, userAuth } = event.dataset
    const changedAuthValue = event.previousElementSibling?.value

    if(!(userAuth == 2)){
        return alert("변경 권한이 없습니다")
    }

    axios({
        method: 'post',
        url: `/admin/manage/user/auth/${userId}`,
        data: {
            changedAuthValue
        } 
      })
        .then(response=>{
            const { result } = response?.data
            if(result){
                alert('권한이 적용되었습니다')
            }
            else{
                alert('권한 적용 과정에서 문제가 발생하였습니다.')
            }
            return window.location.replace("");
        })
        .catch(error=>{
            alert(error)
            return window.location.replace("");
        })
}