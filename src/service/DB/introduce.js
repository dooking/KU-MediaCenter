const { introduce_tab, introduce_post, introduce_image } = require('../models');
const sequelize = require('sequelize')

const IntroduceDB = class {
  static getTabLists() {
    return introduce_tab
      .findAll({
        raw: true,
      })
      .then((results) => {
        return results;
      })
      .catch((err) => {
        return err;
      });
  }
  static getTabId(tabnum) {
    return introduce_tab
    .findOne({
      raw: true,
      where : {
        id: tabnum
      }
    })
    .then((results) => {
      return results;
    })
    .catch((err) => {
      return err;
    });
}
  static getTabPosts(tab_id) {
    return introduce_post
    .findAll({
        raw:true,
        where: {
            tab_id
        }
    })
    .then((results) => {
        return results
    })
  }
  static getPostImages(post_id) {
    return introduce_image
    .findAll({
        raw:true,
        where: {
            post_id
        }
    })
    .then((results) => {
        return results
    })
  }
}
module.exports = IntroduceDB;
