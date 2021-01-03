const moment = require('moment');
const EquipmentDB = require('../../service/equipment-service')
const { getDate, getNextDate } = require('../../utils/momment')
const { fillArray, checkStock } = require('../../utils/util')

const mainPage = (req, res) => {
    res.render("./reservation/main", { user: req.session.user });
}

const equipmentIntro = (req, res) => {
    res.render("./reservation/equipment/intro", { user: req.user });
}

const equipmentStep1 = async (req, res) => {
    const selectDate = req.body?.selectDate || getDate(new Date())
    const nextSelectDate = getNextDate(selectDate)
    // make Camera
    const equipmentLists = await EquipmentDB.getEquipmentLists()
    const equipments = await equipmentLists.reduce (async (promise, equipment)=>{
        let accumulator = await promise.then();
        let count = await EquipmentDB.getEquipmentCount(equipment.id)
        let currentStock = fillArray(24, count)
        let nextStock = fillArray(24, count)
        const reservations = await EquipmentDB.findEquipmentReservation(selectDate, nextSelectDate)
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

const equipmentStep2 = (req, res) => {
    
    res.render("./reservation/equipment/step2", { user: req.user });
}

module.exports = { mainPage, equipmentIntro, equipmentStep1, equipmentStep2 }