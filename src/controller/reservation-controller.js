const mainPage = (req, res) => {
    res.render("./reservation/main", { user: req.session.user });
}

const equipmentIntro = (req, res) => {
    res.render("./reservation/equipment/intro", { user: req.user });
}

const equipmentStep1 = (req, res) => {
    // make Camera


    //   {
    //     "otherObjects": otherObject,
    //     "year": year,
    //     "month": month,
    //     "day": day,
    //     "calendar": year + "-" + month + "-" + day,
    //     "nextDay": nextDay,
    // },
    res.render("./reservation/equipment/step1", { user: req.user });
}

module.exports = { mainPage, equipmentIntro, equipmentStep1 };