const isLogin = (req, res, next) => {
    if (req.session) {
        req.user = req.session.user
        next()
    }
    // Todo : 로그인 안되었을 때 로직 추가
    res.send('<script type="text/javascript">alert("오류발생");</script>');
}

module.exports = { isLogin };
