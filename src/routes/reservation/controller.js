exports.mainPage = (req, res) => {
    res.render("./reservation/main", { user: req.session.user });
}