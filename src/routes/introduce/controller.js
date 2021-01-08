const IntroduceService = require('../../service/introduce-service')

const tab1 = async(req, res) => { 
    const tabs = await IntroduceService.getTabs()
    const post_1 = await IntroduceService.getTabPosts(1)
    const post_2 = await IntroduceService.getTabPosts(2)
    res.render("./introduce/tab1", {
        tabs, post_1, post_2
    });
}

const tab2 = (req, res) => {
    res.render("./introduce/tab2");
}

const tab3 = (req, res) => {
    res.render("./introduce/tab3");
}

const tab4 = (req, res) => {
    res.render("./introduce/tab4");
}

const tab5 = (req, resㅇ) => {
    res.render("./introduce/tab5");
}

const tab6 = (req, res) => {
    res.render("./introduce/tab6");
}

const tab7 = (req, res) => {
    res.render("./introduce/tab7");
}

const tab8 = (req, res) => {
    res.render("./introduce/tab8");
}

module.exports = { tab1, tab2, tab3, tab4, tab5, tab6, tab7, tab8}
