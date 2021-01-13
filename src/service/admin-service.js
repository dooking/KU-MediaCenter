const EquipmentDB = require('./DB/equipment')
const UserDB = require('./DB/user')
const { getDate, getHour, getTime } = require('../utils/momment')
const { STATUS_BOARD } = require('../utils/constant')

exports.getReservationLists = async () => {
    const reservationLists = []
    
    for (let board of STATUS_BOARD){
        const { state } = board
        const reservationList = {...board}
        const reservations = []
        const setReservationNumbers = []
        const reservationItems = await EquipmentDB.getStateReservations({state})
        
        for (let reservationItem of reservationItems){
            const { id, name:userName , from_date:fromDate, to_date:toDate, reservation_number:reservationNumber } = reservationItem
            if(!setReservationNumbers.includes(reservationNumber)){
                setReservationNumbers.push(reservationNumber)
                reservations.push({
                    id,
                    reservationNumber,
                    userName,
                    fromDate : getDate(fromDate),
                    fromDateTime : getHour(fromDate),
                    toDate : getDate(toDate),
                    toDateTime : getHour(toDate),
                })
            }
        }
        reservationLists.push({...reservationList, reservations})
    }

    return reservationLists
}

exports.getEquipmentLists = async (params) => {
    let equipments = []
    const equipmentLists = await EquipmentDB.getEquipmentLists(params)
    for (equipmentList of equipmentLists){
        const { id, equipment_id, serial_number, state, remark, equipment } = equipmentList.dataValues;
        const { category, kind, name } = equipment.dataValues
        equipments.push({
            id,
            state,
            category,
            kind,
            name,
            remark,
            serialNumber: serial_number
        })
    }
    return equipments
}

exports.getEquipmentsLength = async (params) => {
    const counts = await EquipmentDB.getAllEquipmentsCount(params)
    return counts
}

exports.getEquipmentDetail = async (params) => {
    const { id, equipment_id, serial_number, state, remark, equipment } = await EquipmentDB.getEquipmentDetail(params)
    const { category, kind, name } = equipment
    const result = {
        id,
        equipment_id, 
        serial_number, 
        state, 
        remark,
        category, 
        kind, 
        name
    }
    return result
}

exports.updateEquipment = async (params) => {
    await EquipmentDB.updateEquipment(params)
}

exports.updateEquipmentDetail = async (params) => {
    await EquipmentDB.updateEquipmentDetail(params)
}

exports.createEquipmentDetail = async (params) => {
    let equipmentDetailId;
    const equipment = await EquipmentDB.findAlreadyEquipment(params)
    
    if(equipment?.id){
        const newEquipment = await EquipmentDB.insertEquipmentDetail({...params,id : equipment.id}) 
        equipmentDetailId = newEquipment.id
    }
    else{
        const newEquipment = await EquipmentDB.insertEquipment(params)
        const newEquipmentDetail = await EquipmentDB.insertEquipmentDetail({...params,id : newEquipment.id}) 
        equipmentDetailId = newEquipmentDetail.id
    }

    return equipmentDetailId;
}

exports.deleteEquipmentDetail = async (params) => {
    await EquipmentDB.deleteEquipmentDetail(params)
}

exports.historyEquipment = async (params) => {
    const results = []
    const reservations = await EquipmentDB.historyEquipment(params)
    for (let reservation of reservations){
        const { id, reservation_number, from_date, to_date, real_date, group, purpose, contact, authentication, remark, state, user } = reservation;
        const { name } = user
        results.push({
            id,
            name,
            reservation_number, 
            from_date : getDate(from_date), 
            real_date: getDate(real_date),
            group,
            purpose, 
            contact, 
            authentication, 
            remark, 
            state,
        })
    }
    return results
}

exports.getUserLength = async (params) => {
    const totalUsers= await UserDB.getUserLength(params)
    return totalUsers
}

exports.getUserLists = async (params) => {
    const users= await UserDB.getUserLists(params)
    return users
}

exports.getUser = async (params) => {
    const user= await UserDB.getUser(params)
    return user
}

exports.historyUser = async (params) => {
    let results = {}
    let equipments = []
    const setReservationNumbers = []
    const reservations = await EquipmentDB.historyUser(params)
    for (let reservation of reservations){
        let equipmentInfo = {}
        const { id, equipment_id, equipment_detail_id, reservation_number, from_date, to_date, real_date, group, purpose, contact, authentication, remark, state, user } = reservation;
        const { name: userName } = user

        if(equipment_detail_id){
            const { serial_number, equipment } = await EquipmentDB.getEquipmentDetail({id: equipment_detail_id})
            const { category, kind, name : equipmentName } = equipment
            equipmentInfo = {
                category, kind, equipmentName, serial_number
            }
        }
        else{
            const { category, kind, name : equipmentName } = await EquipmentDB.getEquipment({id: equipment_id})
            equipmentInfo = {
                category, kind, equipmentName
            }
        }

        if(!setReservationNumbers.includes(reservation_number)){
            setReservationNumbers.push(reservation_number)
            equipments = []
            results[`${reservation_number}`] = {
                id,
                name: userName,
                reservation_number, 
                equipments : [...equipments, equipmentInfo],
                from_date : getDate(from_date), 
                from_date_time : getTime(from_date),
                real_date: getDate(real_date),
                real_date_time: getTime(real_date),
                group,
                purpose, 
                contact, 
                authentication, 
                remark, 
                state,
            }
        }
        else{ 
            results[`${reservation_number}`].equipments.push(equipmentInfo)
        }
    }
    return results
}

exports.updateUserPenalty = async (params) => {
    await UserDB.updatePenalty(params)
}

exports.updateUserAuth = async (params) => {
    await UserDB.updateAuth(params)
}