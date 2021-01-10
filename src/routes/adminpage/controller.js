const AdminService = require('../../service/admin-service')
const { PER_PAGE } = require('../../utils/constant')
exports.mainPage = async (req, res, next) => {
    try{
        const reservationLists = await AdminService.getReservationLists()

        res.render("./adminpage/main", {reservationLists});
    }
    catch(error){
        next(error);
    }
}

exports.manageEquipment = async (req, res, next) => {
    try{
        const pageNum = req.query?.page;
        const offset = pageNum > 1 ? PER_PAGE*(pageNum-1) : 0
        const equipmentsCount = await AdminService.getEquipmentsLength()
        const totalPage = parseInt(equipmentsCount/PER_PAGE)+1
        const equipments = await AdminService.getEquipmentLists({offset, pageNum})

        res.render('./adminpage/manageEquipment',{equipments,pageNum,totalPage})
    }
    catch(error){
        next(error)
    }
}

