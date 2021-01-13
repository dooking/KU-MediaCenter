const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const getDate = (date) => {
    if(!date){
        return '---'
    }
    return moment(date).format("YYYY-MM-DD");   
}

const getDateWithTime = (date, time) => {
    return moment(`${date} ${time}`, "YYYY-MM-DD H").format()
}

const getHour = (date) => {
    return moment(date).hour();
}

const getTime = (date) => {
    if(!date){
        return '---'
    }
    return moment(date).format("HH:mm")
}

const getNextDate = (date) => {
    return getDate(moment(date).add(1,'days'))
}

module.exports = { getDate, getHour, getTime, getNextDate, getDateWithTime };
