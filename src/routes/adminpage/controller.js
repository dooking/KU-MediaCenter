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

exports.modifyEquipment = async (req, res, next) => {
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

exports.updateEquipment = async (req, res, next) => {
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

exports.deleteEquipment = async (req, res, next) => {
    try{
        const { deleteList } = req.body
        await AdminService.deleteEquipmentDetail(deleteList)
        res.status(200).send({
            result : true
        })
    }
    catch(error){
        res.state(400).send({
            result : false
        })
    }
}

exports.addEquipment = async (req, res, next) => {
    try{
        res.render('./adminpage/equipment-add')
    }
    catch(error){
        next(error)
    }
}

exports.createEquipment = async (req, res, next) => {
    try{
        const { formData } = req.body
        const equipmentDetailId = await AdminService.createEquipmentDetail(formData)

        res.status(200).send({
            result : true,
            equipmentDetailId
        })
    }
    catch(error){
        res.status(400).send({
            result : false
        })
    }
}

exports.manageUser = async (req, res, next) => {
    try{
        const pageNum = req.query?.page || 1;
        const searchWord = req.query?.search || '';
        const offset = pageNum > 1 ? PER_PAGE*(pageNum-1) : 0

        const totalUsers = await AdminService.getUserLength({ searchWord })
        const users = await AdminService.getUserLists({ offset, searchWord })

        res.render('./adminpage/user-manage',{
            users,
            pageNum,
            totalPage : parseInt(totalUsers/PER_PAGE)+1,
            searchWord
        })
    }
    catch(error){
        next(error)
    }
}

exports.detailUser = async (req, res, next) => {
    try{
        const { id } = req.params
        const userInfo = await AdminService.getUser({id})

        res.render('./adminpage/user-detail',{userInfo})
    }
    catch(error){
        next(error)
    }
}

exports.historyUser = async (req, res, next) => {
    try{
        const { id } = req.params
        const userInfo = await AdminService.getUser({id})
        const reservations = await AdminService.historyUser({id})

        res.render('./adminpage/user-history',{
            reservations, 
            userInfo
        })
    }
    catch(error){
        next(error)
    }
}

exports.penaltyUser = async (req, res, next) => {
    try{
        const { id } = req.params
        const { changedPenaltyValue } = req.body
        await AdminService.updateUserPenalty({id,penalty:changedPenaltyValue})

        res.status(200).send({
            result : true
        })
    }
    catch(error){
        res.status(400).send({
            result : false
        })
    }
}

exports.authUser = async (req, res, next) => {
    try{
        const { id } = req.params
        const { changedAuthValue } = req.body
        await AdminService.updateUserAuth({id,auth:changedAuthValue})

        res.status(200).send({
            result : true
        })
    }
    catch(error){
        res.status(400).send({
            result : false
        })
    }
}