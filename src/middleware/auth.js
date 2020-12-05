const isLogin = (req, res, next) => {
    req.isLogin = req.session ? true : false;
    next()
}

module.exports = { isLogin };
