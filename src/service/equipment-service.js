const { equipment, equipment_detail, equipment_reservation } = require('../models');
const sequelize = require('sequelize')

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
  static getEquipmentCount(id){
    return equipment_detail
      .count({
        raw: true,
        where : {
          equipment_id : id,
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
  static getEquipmentId(name) {
    return equipment
      .findOne({
        raw: true,
        where : {
          name
        }
      })
      .then((results) => {
        return results;
      })
      .catch((err) => {
        return err;
      });
  }
  static findEquipmentReservation({ id, selectDate, nextSelectDate}) {
    return equipment_reservation
      .findAll({
        raw: true, 
        attributes: ['from_date', 'to_date'],
        where : {
          equipment_id : id,
          state : {
            [sequelize.Op.or]: [0,1,3,4,6]
          },
          [sequelize.Op.or] : [
              sequelize.where(sequelize.fn('date', sequelize.col('from_date')), '=', selectDate),
              sequelize.where(sequelize.fn('date', sequelize.col('to_date')), '=', selectDate),
              sequelize.where(sequelize.fn('date', sequelize.col('from_date')), '=', nextSelectDate),
              sequelize.where(sequelize.fn('date', sequelize.col('to_date')), '=', nextSelectDate),
          ]
        }
      })
      .then((results) => {
        return results;
      })
      .catch((err) => {
        return err;
      });
  }
  static insertReservation({equipId, userId, reservationNumber, fromDate, toDate, group, phone, purpose, auth, remark }){
    return equipment_reservation.create({
      raw: true,
      equipment_id : equipId, 
      user_id : userId, 
      reservation_number : reservationNumber, 
      from_date : fromDate, 
      to_date : toDate, 
      group,
      contact: phone, 
      purpose, 
      authentication: auth, 
      remark,
      state : 0
    })
    .then((results) => {
        return [null, results]
    })
    .catch((err) => {
        return [err, null]
    })
}
};
module.exports = EquipmentDB;
