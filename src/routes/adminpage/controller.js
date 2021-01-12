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
        console.log(equipments)
        res.render('./adminpage/equipment-manage',{
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

        res.render('./adminpage/equipment-detail',{equipment})
    }
    catch(error){
        next(error)
    }
}

exports.updateEquipment = async (req, res, next) => {
    try{
        const { id } = req.params
        const equipment = await AdminService.getEquipmentDetail({id})

        res.render('./adminpage/equipment-update',{equipment})
    }
    catch(error){
        next(error)
    }
}

exports.historyEquipment = async (req, res, next) => {
    try{
        const { id } = req.params
        const equipment = await AdminService.getEquipmentDetail({id})
        const reservations = await AdminService.historyEquipment({id})

        res.render('./adminpage/equipment-history',{
            reservations, 
            equipment
        })
    }
    catch(error){
        next(error)
    }
}

exports.modifyEquipment = async (req, res, next) => {
    try{
        const { id } = req.params
        const { category, kind, name, serial_number, remark, state, equipment_id } = req.body
        await AdminService.updateEquipment({equipment_id, category, kind, name})
        await AdminService.updateEquipmentDetail({ id, serial_number, state, remark})

        res.redirect(`/admin/manage/equipment/detail/${id}`)
    }
    catch(error){
        next(error)
    }
}

