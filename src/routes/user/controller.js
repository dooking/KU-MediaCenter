const successLogin = async (req, res, next) => {
    try {
        const { id, name, major, auth } = req.user
        req.session.user = {
            userId: id,
            name: name,
            major: major,
            auth: auth
        }
        req.session.save(() => {
            res.redirect('/reservation')
        })
    } catch (error) {
        next.log(error);
    }
};

const failureLogin = (req, res) => {
    res.render("error", { message: "Login Failure", error: { status: 401, stack: "fail" } })
};

const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}
module.exports = { successLogin, failureLogin, logout };
