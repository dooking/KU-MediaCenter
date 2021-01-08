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
}