const moment = require('moment');
const EquipmentService = require('../../../service/equipment-service')
const { getDate, getNextDate } = require('../../../utils/momment')


exports.intro = (req, res, next) => {
    res.render("./reservation/equipment/intro", { user: req.user });
}

exports.step1 = async (req, res, next) => {
    try{
        const selectDate = req.body?.selectDate || getDate(new Date())
        const nextSelectDate = getNextDate(selectDate)
        const equipments = await EquipmentService.getStockData(selectDate, nextSelectDate)
        
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
    catch(error){
        next(error);
    }
}

exports.step2 = (req, res, next) => {
    try{
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
    catch(error){
        next(error);
    }
}

exports.finish = async (req, res, next) => {
    try{
        const { userId } = req.session?.user
        await EquipmentService.addReservation(userId, req.body)
        res.redirect('/');
    }
    catch(error){
        next(error);
    }
}
