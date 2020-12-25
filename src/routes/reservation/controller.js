const moment = require('moment');
const EquipmentDB = require('../../service/equipment-service')
const { getDate, getNextDate } = require('../../utils/momment')
const { fillArray, checkStock } = require('../../utils/util')

const test = async (req, res) => {
    const now2 = Date.now();
    console.log("nowdddddddddddd",now2)
    const results = await EquipmentDB.test(now2)
    res.send({results});
}

const mainPage = (req, res) => {
    res.render("./reservation/main", { user: req.session.user });
}

const equipmentIntro = (req, res) => {
    res.render("./reservation/equipment/intro", { user: req.user });
}

const equipmentStep1 = async (req, res) => {
    const selectDate = req.query?.selectDate || getDate(new Date())
    const nextSelectDate = getNextDate(selectDate)
    // make Camera
    const equipmentLists = await EquipmentDB.getEquipmentLists()
    const equipments = await equipmentLists.reduce (async (promise, equipment)=>{
        let accumulator = await promise.then();
        let count = await EquipmentDB.getEquipmentCount()
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
                category : equipment.category,
                name : equipment.kind + '(' + equipment.name + ')',
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
        selectDate
     })
}

module.exports = { mainPage, equipmentIntro, equipmentStep1, test }