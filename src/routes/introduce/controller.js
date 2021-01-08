const IntroduceService = require('../../service/introduce-service')
const { post } = require('./introduce')

exports.tab1 = async(req, res) => { 
    const posts = await IntroduceService.getTabPosts(1)
    const post_1 = posts[0]
    const post_2 = posts[1]
    res.render("./introduce/tab1", {
        post_1, post_2
    });
}

exports.tab2 = async (req, res) => {
    const tab = await IntroduceService.getTab(2)
    let posts = await IntroduceService.getTabPosts(2)
    
    for (let post of posts) {
        post["images"] = await IntroduceService.getPostImages(post.id)
    }

    res.render("./introduce/tab2", {
        tab, posts
    });
}

exports.tab3 = async (req, res) => {
    const tab = await IntroduceService.getTab(3)
    const posts = await IntroduceService.getTabPosts(3)
    for (let post of posts) {
        post["images"] = await IntroduceService.getPostImages(post.id)
    }
    res.render("./introduce/tab3", {
        tab, posts
    });
}

exports.tab4 = async (req, res) => {
    const tab = await IntroduceService.getTab(4)
    const posts = await IntroduceService.getTabPosts(4)
    for (let post of posts) {
        post["images"] = await IntroduceService.getPostImages(post.id)
    }
    res.render("./introduce/tab4", {
        tab, posts
    });
}

exports.tab5 = async (req, res) => {
    const tab = await IntroduceService.getTab(5)
    const posts = await IntroduceService.getTabPosts(5)
    for (let post of posts) {
        post["images"] = await IntroduceService.getPostImages(post.id)
    }

    res.render("./introduce/tab5",{
        tab, posts
    });
}

exports.tab6 = async (req, res) => {
    const tab = await IntroduceService.getTab(6)
    const posts = await IntroduceService.getTabPosts(6)

    res.render("./introduce/tab6",{
        tab, posts
    });
}

exports.tab7 = async (req, res) => {
    const tab = await IntroduceService.getTab(7)
    const posts = await IntroduceService.getTabPosts(7)
    for (let post of posts) {
        post["images"] = await IntroduceService.getPostImages(post.id)
    }
    res.render("./introduce/tab7",{
        tab, posts
    });
}

exports.tab8 = async (req, res) => {
    const tab = await IntroduceService.getTab(8)
    const posts = await IntroduceService.getTabPosts(8)

    const post_1 = posts[0]
    const post_2 = posts[1]
    res.render("./introduce/tab8", {
        post_1, post_2
    });
}

