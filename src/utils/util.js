const moment = require('moment');
const { getDate, getHour } = require('./momment')
const { RANDOM_LENGTH, RANDOM_MAX } = require('./constant')

const fillArray = (length, count) => {
    return new Array(length).fill(count);
}

const checkStock = (stock, selectDate, fromDate, toDate) => {
    if(selectDate === (getDate(fromDate) || getDate(toDate))){
        for (let hour = getHour(fromDate); hour < getHour(toDate)+2; hour++){
            stock[hour] -= 1
        }
    }
    return stock
}

const makeReservationNumber = () => {
    const date = moment(new Date()).format("YYYYMMDD");
    let randomString = ''
    new Array(RANDOM_LENGTH).fill(0).forEach(()=>{
        randomString += Math.floor(Math.random()*RANDOM_MAX)
    })
    return date + '-' + randomString
}

const generateDefaultPromiseDict = (categories) => {
    let defaultPromiseDict = {}
    for (let category of categories) {
        defaultPromiseDict[category] = []
    }
}

module.exports = { fillArray, checkStock, makeReservationNumber, generateDefaultPromiseDict };