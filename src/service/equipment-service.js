const EquipmentDB = require('./DB/equipment')
const { fillArray, checkStock, makeReservationNumber } = require('../utils/util')
const { getDateWithTime } = require('../utils/momment')

exports.getStockData = async (selectDate, nextSelectDate)=>{
    const equipmentLists = await EquipmentDB.getEquipmentLists()
    const equipments = await equipmentLists.reduce (async (promise, equipment)=>{
        const { id } = equipment
        let accumulator = await promise.then();
        let count = await EquipmentDB.getEquipmentCount(equipment.id)
        let currentStock = fillArray(24, count)
        let nextStock = fillArray(24, count)

        const reservations = await EquipmentDB.findEquipmentReservation({ id, selectDate, nextSelectDate})
        reservations.map((reservation)=>{
            const { from_date: fromDate, to_date: toDate } = reservation
            currentStock = checkStock(currentStock, selectDate, fromDate, toDate)
            nextStock = checkStock(nextStock, nextSelectDate, fromDate, toDate)
        })

        accumulator[`${equipment.category}`].push(
            {
                id : equipment.id,
                category : equipment.category,
                kind : equipment.kind,
                name : equipment.name,
                currentStock,
                nextStock
            }
        )
        
        return Promise.resolve(accumulator);
    },Promise.resolve({
        "카메라" : [],
        "카메라 보조 장치":[],
        "녹음 장비":[],
        "조명": [],
        "기타 부속": []
    }))

    return equipments
}

exports.addReservation = async (userId, { equipments, fromDateValue, fromDateTime, toDateValue, toDateTime, group, phone, purpose, auth, remark}) => {
    const fromDate = getDateWithTime(fromDateValue, fromDateTime)
    const toDate = getDateWithTime(toDateValue, toDateTime)

    const reservationNumber = makeReservationNumber()
    console.log(typeof equipments, equipments)
    for (let equipment of equipments){
        if(!equipment.includes('::')) continue;
        const [equipmentCategory,count] = equipment.split('::')
        const re = /(?<=\().*(?=\))/
        const equipmentName = re.exec(equipmentCategory)
        if(!equipmentName){
            throw '에러 발생'
        }
        const { id: equipId } = await EquipmentDB.getEquipmentId(equipmentName[0])
        for (let i of Array(parseInt(count)).fill(0)){
            await EquipmentDB.insertReservation({equipId, userId, reservationNumber, fromDate, toDate, group, phone, purpose, auth, remark })
        }
    }
}