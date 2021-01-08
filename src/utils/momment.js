const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const getDate = (date) => {
    return moment(date).format("YYYY-MM-DD");   
}

const getDateWithTime = (date, time) => {
    return moment(`${date} ${time}`, "YYYY-MM-DD h").format()
}

const getHour = (date) => {
    return moment(date).hour();
}

const getNextDate = (date) => {
    return getDate(moment(date).add(1,'days'))
}

module.exports = { getDate, getHour, getNextDate, getDateWithTime };
