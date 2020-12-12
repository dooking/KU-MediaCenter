const { equipment } = require('../models');

const EquipmentDB = class {
  static findUser(sub) {
    return user
      .findOne({
        raw: true,
        where: {
          identity: sub,
        },
      })
      .then((results) => {
        return [null, results];
      })
      .catch((err) => {
        return [err];
      });
  }
};
module.exports = EquipmentDB;
