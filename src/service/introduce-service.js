const IntroduceDB = require('./DB/introduce')


exports.getTabs = async () =>{
    const tabs = await IntroduceDB.getTabItems()
    return tabs
}

exports.getTab = async (tabnum) =>{
    const tab = await IntroduceDB.getTabInstance(tabnum)
    return tab
}

exports.getTabId = async (tabnum) => {
    const tabId = await IntroduceDB.getTabId(tabnum)
    return tabId
}

exports.getTabPosts = async (tab_id) => {
    const tabPosts = await IntroduceDB.getTabPosts(tab_id)
    return tabPosts
}

exports.getPostImages = async (post_id) => {
    const postImages = await IntroduceDB.getPostImages(post_id)
    return postImages
}
