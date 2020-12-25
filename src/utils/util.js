const getTodayDate = () => {
    const today = new Date();   
    const year = today.getFullYear(); // 년도
    const month = today.getMonth() + 1;  // 월
    const date = today.getDate();  // 날짜
    return year + '-' + month + '-' + date
}

module.exports = {getTodayDate}