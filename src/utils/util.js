const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const getTodayDate = () => {
    return moment().format("YYYY-MM-DD");   
}
module.exports = {getTodayDate};