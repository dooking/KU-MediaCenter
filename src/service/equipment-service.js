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
  static test(now) {
    let today = new Date();   
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    const todayDate = year + '-' + month + '-' + date
    return equipment_reservation
      .findAll({
        raw: true,
        where : {
          [sequelize.Op.or] : [
              sequelize.where(sequelize.fn('date', sequelize.col('from_date')), '=', todayDate),
              sequelize.where(sequelize.fn('date', sequelize.col('to_date')), '=', todayDate),
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
