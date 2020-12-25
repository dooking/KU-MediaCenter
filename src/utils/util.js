const { getDate, getHour } = require('./momment')

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

module.exports = { fillArray, checkStock };