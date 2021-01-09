const IntroduceService = require('../../service/introduce-service')

exports.tab = async(req,res) => {
    try{
        const items = await IntroduceService.getTabs()
        res.render("./introduce/base/base-footer.ejs", {
            items
        });
    }
    catch(error){
        next(error);
    }
}

exports.main = async(req,res) => {
    try{
        const items = await IntroduceService.getTabs()

        res.render("./introduce/main.ejs", {
            items
        });
    }
    catch(error){
        next(error);
    }
}

exports.tab1 = async(req, res) => { 
    try{
        const items = await IntroduceService.getTabs()
        const posts = await IntroduceService.getTabPosts(1)
        const post_1 = posts[0]
        const post_2 = posts[1]
        
        res.render("./introduce/tab1", {
            items, post_1, post_2
        });
    }
    catch(error){
        next(error);
    }
}

exports.tab2 = async (req, res) => {
    try{
        const items = await IntroduceService.getTabs()
        const tab = await IntroduceService.getTab(2)
        let posts = await IntroduceService.getTabPosts(2)

        for (let post of posts) {
            post["images"] = await IntroduceService.getPostImages(post.id)
        }

        res.render("./introduce/tab2", {
            items, tab, posts
        });
    }
    catch(error){
        next(error);
    }
}

exports.tab3 = async (req, res) => {
    try{
        const items = await IntroduceService.getTabs()
        const tab = await IntroduceService.getTab(3)
        const posts = await IntroduceService.getTabPosts(3)

        for (let post of posts) {
            post["images"] = await IntroduceService.getPostImages(post.id)
        }

        res.render("./introduce/tab3", {
            items, tab, posts
        });
    }
    catch(error){
        next(error);
    }
}

exports.tab4 = async (req, res) => {
    try{
        const items = await IntroduceService.getTabs()
        const tab = await IntroduceService.getTab(4)
        const posts = await IntroduceService.getTabPosts(4)

        for (let post of posts) {
            post["images"] = await IntroduceService.getPostImages(post.id)
        }

        res.render("./introduce/tab4", {
            items, tab, posts
        });
    }
    catch(error){
        next(error);
    }
}

exports.tab5 = async (req, res) => {
    try{
        const items = await IntroduceService.getTabs()
        const tab = await IntroduceService.getTab(5)
        const posts = await IntroduceService.getTabPosts(5)
            
        for (let post of posts) {
            post["images"] = await IntroduceService.getPostImages(post.id)
        }

        res.render("./introduce/tab5",{
            items, tab, posts
        });
    }
    catch(error){
        next(error);
    }
}

exports.tab6 = async (req, res) => {
    try{
        const items = await IntroduceService.getTabs()
        const tab = await IntroduceService.getTab(6)
        const posts = await IntroduceService.getTabPosts(6)

        res.render("./introduce/tab6",{
            items, tab, posts
        });
    }
    catch(error){
        next(error);
    }
}

exports.tab7 = async (req, res) => {
    try{
        const items = await IntroduceService.getTabs()
        const tab = await IntroduceService.getTab(7)
        const posts = await IntroduceService.getTabPosts(7)

        for (let post of posts) {
            post["images"] = await IntroduceService.getPostImages(post.id)
        }

        res.render("./introduce/tab7",{
            items, tab, posts
        });
    }
    catch(error) {
        next(error);
    }
}

exports.tab8 = async (req, res) => {
    try{
        const items = await IntroduceService.getTabs()
        const tab = await IntroduceService.getTab(8)
        const posts = await IntroduceService.getTabPosts(8)
        const post_1 = posts[0]
        const post_2 = posts[1]

        res.render("./introduce/tab8", {
            items, tab, post_1, post_2
        });
    }
    catch(error){
        next(error);
    }
}

