const EquipmentDB = require('./DB/equipment')
const { STATUS_BOARD } = require('../utils/constant')

exports.getReservationLists = async () => {
    const reservationLists = []
    
    for (let board of STATUS_BOARD){
        const reservationList = {}
        const reservations = []
        const numbers = []
        const { title, state } = board
        reservationList.title = title
        const tests = await EquipmentDB.getStateReservations({state})
        for (let test of tests){
            const { id, name:userName , from_date:fromDate, to_date:toDate, reservation_number:reservationNumber } = test
            if(!numbers.includes(reservationNumber)){
                numbers.push(reservationNumber)
                reservations.push({
                    id,
                    reservationNumber,
                    userName,
                    fromDate,
                    toDate
                })
            }
        }
        reservationList.reservations = reservations
        console.log(reservations)
        reservationLists.push(reservationList)
    }
    console.log(reservationLists)
    return reservationLists
}