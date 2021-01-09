const AdminService = require('../../service/admin-service')

exports.mainPage = async (req, res) => {
    try{
        const reservationLists = await AdminService.getReservationLists()
        console.log(reservationLists)
        res.render("./adminpage/main", {reservationLists});
    }
    catch(error){
        next(error);
    }
}

