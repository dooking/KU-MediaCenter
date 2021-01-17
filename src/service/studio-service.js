const StudioDB = require('./DB/studio')
const { fillArray, checkStock, makeReservationNumber, generateDefaultPromiseDict } = require('../utils/util')
const { getDateWithTime } = require('../utils/momment')


exports.getStockData = async (selectDate, nextSelectDate)=>{
    const studioLists = await StudioDB.getStudioCategoryLists()
    const defaultPromiseDict = generateDefaultPromiseDict(studioLists)
    const studios = await studioLists.reduce (async (promise, studio)=>{
        const { id } = studio
        let accumulator = await promise.then();
        let count = await StudioDB.getStudioCount(studio.id)
        let currentStock = fillArray(24, count)
        let nextStock = fillArray(24, count)

        const reservations = await StudioDB.getReservations({ id, selectDate, nextSelectDate})
        reservations.map((reservation)=>{
            const { from_date: fromDate, to_date: toDate } = reservation
            currentStock = checkStock(currentStock, selectDate, fromDate, toDate)
            nextStock = checkStock(nextStock, nextSelectDate, fromDate, toDate)
        })

        accumulator[`${studio.category}`].push(
            {
                id : studio.id,
                category : studio.category,
                name : studio.name,
                currentStock,
                nextStock
            }
        )

        return Promise.resolve(accumulator);
    },Promise.resolve(defaultPromiseDict))

    return studios
}

exports.addReservation = async (userId, { studios, fromDateValue, fromDateTime, toDateValue, toDateTime, group, phone, purpose, auth, remark }) => {
    const fromDate = getDateWithTime(fromDateValue, fromDateTime)
    const toDate = getDateWithTime(toDateValue, toDateTime)

    const reservationNumber = makeReservationNumber()
    for (let studio of studios){
        if(!studio.includes('::')) continue;
        const [studioCategory,count] = studio.split('::')
        const re = /(?<=\().*(?=\))/
        const studioName = re.exec(studioCategory)
        if(!studioName){
            throw '에러 발생'
        }
        const { id: studioId } = await StudioDB.getStudioId(studioName[0])
        for (let i of Array(parseInt(count)).fill(0)){
            await StudioDB.insertReservation({studioId, userId, reservationNumber, fromDate, toDate, group, phone, purpose, auth, remark })
        }
    }
}