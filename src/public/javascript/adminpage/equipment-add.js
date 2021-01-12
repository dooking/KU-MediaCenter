// 장비 추가
function addEquipment(){
    const category = document.querySelector('#category').value;
    const kind = document.querySelector('#kind').value;
    const name = document.querySelector('#name').value;
    const serial_number = document.querySelector('#serial_number').value;
    const formData = {
        category, kind, name, serial_number
    }

    if(!kind){
        alert('장비의 타입이 존재하지 않습니다.')
        return false;
    }
    if(!name){
        alert('장비의 이름이 존재하지 않습니다.')
        return false;
    }
    if(!serial_number){
        alert('장비의 일련 번호가 존재하지 않습니다.')
        return false;
    }

    axios({
        method: 'post',
        url: '/admin/manage/equipment/add',
        data: {
            formData
        } 
        })
        .then(response=>{
            const { result, equipmentDetailId } = response?.data
            if(result){
                alert('장비가 성공적으로 추가되었습니다.')
                return window.location.replace(`/admin/manage/equipment/detail/${equipmentDetailId}`);
            }
            else{
                alert('장비 추가 과정에서 문제가 발생하였습니다.')
                return window.location.replace("");
            }
        })
        .catch(error=>{
            alert(error)
            return window.location.replace("");
        })
}