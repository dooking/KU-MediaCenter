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
  static findEquipmentReservation(selectDate, nextSelectDate) {
    return equipment_reservation
      .findAll({
        raw: true, 
        attributes: ['from_date', 'to_date'],
        where : {
          [sequelize.Op.or] : [
              sequelize.where(sequelize.fn('date', sequelize.col('from_date')), '=', selectDate),
              sequelize.where(sequelize.fn('date', sequelize.col('to_date')), '=', selectDate),
              sequelize.where(sequelize.fn('date', sequelize.col('from_date')), '=', nextSelectDate),
              sequelize.where(sequelize.fn('date', sequelize.col('to_date')), '=', nextSelectDate),
          ]
          // [sequelize.Op.or] : [
          //   {
          //   [sequelize.Op.and]:[
          //     sequelize.where(sequelize.fn('date', sequelize.col('from_date')), '>=', todayDate),
          //     sequelize.where(sequelize.fn('date', sequelize.col('from_date')), '<=', tomorrowDate),
          //   ]},
          //   {
          //   [sequelize.Op.and]:[
          //     sequelize.where(sequelize.fn('date', sequelize.col('to_date')), '>=', todayDate),
          //     sequelize.where(sequelize.fn('date', sequelize.col('to_date')), '<=', tomorrowDate),
          //   ]}
          // ]
        }
      })
      .then((results) => {
        console.log(results)
        return results;
      })
      .catch((err) => {
        return err;
      });
  }
};
module.exports = EquipmentDB;
