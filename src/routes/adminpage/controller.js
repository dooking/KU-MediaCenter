const AdminService = require('../../service/admin-service')

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
        const equipments = await AdminService.getEquipmentLists()

        res.render('./adminpage/manageEquipment',{equipments})
    }
    catch(error){
        next(error)
    }
}

