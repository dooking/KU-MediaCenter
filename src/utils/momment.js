const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const getDate = (date) => {
    return moment(date).format("YYYY-MM-DD");   
}

const getHour = (date) => {
    return moment(date).hour();
}

const getNextDate = (date) => {
    return getDate(moment(date).add(1,'days'))
}

module.exports = { getDate, getHour, getNextDate };
