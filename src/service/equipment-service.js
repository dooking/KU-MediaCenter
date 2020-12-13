const { equipment, equipment_detail, equipment_reservation } = require('../models');

const EquipmentDB = class {
  static getEquipmentLists() {
    return equipment
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
  static getEquipmentCount(){
    return equipment_detail
      .count({
        raw: true,
        where : {
          equipment_id : 1,
          state : 0
        }
      })
      .then((results) => {
        return results;
      })
      .catch((err) => {
        return err;
      });
  }
  static findEquipmentReservation(id) {
    return equipment_reservation
      .findAll({
        raw: true,
        where : {
          equipment_id : id,
          state: 0,
          
        }
      })
      .then((results) => {
        return results;
      })
      .catch((err) => {
        return err;
      });
  }
};
module.exports = EquipmentDB;
