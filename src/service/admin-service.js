const EquipmentDB = require('./DB/equipment')
const { getDate, getHour } = require('../utils/momment')
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