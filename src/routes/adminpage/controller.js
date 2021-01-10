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
        const pageNum = req.query?.page || 1;
        const searchWord = req.query?.search || '';

        const offset = pageNum > 1 ? PER_PAGE*(pageNum-1) : 0
        const equipmentsCount = await AdminService.getEquipmentsLength({ searchWord })
        const equipments = await AdminService.getEquipmentLists({offset, searchWord})

        res.render('./adminpage/manageEquipment',{
            equipments,
            pageNum,
            totalPage : parseInt(equipmentsCount/PER_PAGE)+1,
            searchWord
        })
    }
    catch(error){
        next(error)
    }
}

exports.detailEquipment = async (req, res, next) => {
    try{
        const { id } = req.params
        const equipment = await AdminService.getEquipmentDetail({id})
        console.log("ZZ",equipment)
        res.render('./adminpage/detailEquipment',{equipment})
    }
    catch(error){
        next(error)
    }
}

