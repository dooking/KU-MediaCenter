const moment = require('moment');
const EquipmentDB = require('../../../service/equipment-service')
const { getDate, getNextDate, getDateWithTime } = require('../../../utils/momment')
const { fillArray, checkStock, makeReservationNumber } = require('../../../utils/util')


exports.intro = (req, res) => {
    res.render("./reservation/equipment/intro", { user: req.user });
}

exports.step1 = async (req, res) => {
    const selectDate = req.body?.selectDate || getDate(new Date())
    const nextSelectDate = getNextDate(selectDate)
    // make Camera
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
    res.render("./reservation/equipment/step1", { 
        user: req.user,
        equipments,
        selectDate: {
            year : moment(selectDate).year(),
            month : moment(selectDate).month() + 1,
            day : moment(selectDate).date()
        },
        nextSelectDate: {
            year : moment(nextSelectDate).year(),
            month : moment(nextSelectDate).month() + 1,
            day : moment(nextSelectDate).date()
        }
     })
}

exports.step2 = (req, res) => {
    const { fromDate, toDate, startAMPM, endAMPM, fromTime, toTime } = req.body
    const fromDateTime = startAMPM == 'am' ? parseInt(fromTime) : parseInt(fromTime) + 12
    const toDateTime = endAMPM == 'am' ? parseInt(toTime) : parseInt(toTime) + 12
    res.render("./reservation/equipment/step2", { 
        user: req.user,
        fromDate,
        fromDateTime,
        toDate,
        toDateTime
    });
}

exports.finish = async (req, res) => {
    try{
        const { equipments, fromDateValue, fromDateTime, toDateValue, toDateTime, group, phone, purpose, auth, remark} = req.body
        const { userId } = req.session.user
        const fromDate = getDateWithTime(fromDateValue, fromDateTime)
        const toDate = getDateWithTime(toDateValue, toDateTime)
        const reservationNumber = makeReservationNumber()
        const results = await equipments.forEach (async (equipment)=>{
            const [equipmentCategory,count] = equipment.split('::')
            const re = /(?<=\().*(?=\))/
            const equipmentName = re.exec(equipmentCategory)
            if(!equipmentName){
                throw '에러 발생'
            }
            const { id: equipId } = await EquipmentDB.getEquipmentId(equipmentName[0])
            for (let i of Array(parseInt(count)).fill(0)){
                const addReservation = await EquipmentDB.insertReservation({equipId, userId, reservationNumber, fromDate, toDate, group, phone, purpose, auth, remark })
            }
        })
        res.redirect('/');
    }
    catch(err){
        next.log(error);
    }
}
