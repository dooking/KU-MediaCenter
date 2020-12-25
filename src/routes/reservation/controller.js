const EquipmentDB = require('../../service/equipment-service')
const {getTodayDate} = require('../../utils/util')

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
    const selectDate = req.query?.selectDate || new Date()
    // make Camera
    const equipmentLists = await EquipmentDB.getEquipmentLists()
    const Equipments = await equipmentLists.reduce (async (promise, equipment, index)=>{
        let equipmentList = await promise.then();
        const equipmentDetail = await EquipmentDB.findEquipmentReservation(getTodayDate())
        console.log("equip: ", equipmentDetail[0].from_date, typeof equipmentDetail[0].from_date)
        console.log("equip111: ", equipmentDetail[0].from_date.getDate(), typeof equipmentDetail[0].from_date)
        console.log("equip222: ", equipmentDetail[0].from_date.getHours(), typeof equipmentDetail[0].from_date)
        const count = await EquipmentDB.getEquipmentCount()
        const today = new Array(24).fill(count);
        const tomorrow = new Array(24).fill(count);
        equipmentList[`${equipment.category}`].push(
            {
                category : equipment.category,
                name : equipment.kind + '(' + equipment.name + ')',
                today ,
                tomorrow
            }
        )
        return Promise.resolve(equipmentList);
    },Promise.resolve({
        "카메라" : [],
        "카메라 보조 장치":[],
        "녹음 장비":[],
        "조명": [],
        "기타 부속": []
    }))
    res.render("./reservation/equipment/step1", { 
        user: req.user,
        Equipments,
        selectDate
     })
}

module.exports = { mainPage, equipmentIntro, equipmentStep1, test }