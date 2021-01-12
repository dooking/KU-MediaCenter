const { user, equipment, equipment_detail, equipment_reservation } = require('../../models');
const { PER_PAGE } = require('../../utils/constant')
const sequelize = require('sequelize')

const EquipmentDB = class {
  static getEquipmentTypeLists() {
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
  static getEquipmentLists({ offset,searchWord }) {
    return equipment_detail
      .findAll({
        include: [
          { 
            model: equipment,
            where : {
              name: {
                [sequelize.Op.like]: "%" + searchWord + "%", 
              },
            },
            order: [
              ['name','ASC'],
            ],
          }             
        ],
        offset: offset,
        limit: PER_PAGE
      })
      .then((results) => {
        return results;
      })
      .catch((err) => {
        return err;
      });
  }
  static getAllEquipmentsCount({ searchWord }){
    return equipment_detail
      .count({
        raw: true,
        include: [
          { 
            model: equipment,
            where : {
              name: {
                [sequelize.Op.like]: "%" + searchWord + "%", 
              },
            }
          }
       ],
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
  static getEquipmenmtDetail({id}) {
    return equipment_detail
    .findOne({
      include: [
        { 
          model: equipment,
        }
     ],
     where : {
       id
     }
    })
    .then((results) => {
      return results.dataValues;
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
  static getReservations({ id, selectDate, nextSelectDate}) {
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
  static getStateReservations({ state }) {
    return equipment_reservation
      .findAll({
        raw: true, 
        attributes: ['id', 'user_id', 'reservation_number', 'from_date', 'to_date', 'user.name'],
        where : {
          state
        },
        include: [
          { 
            model: user,
            attributes: ['name']
          }
       ],
      })
      .then((results) => {
        return results;
      })
      .catch((err) => {
        return err;
      });
  }
  static updateEquipment({ equipment_id, category, kind, name }) {
    return equipment
      .update(
        {
          category, 
          kind, 
          name
        },
        {
          where: {
            id: equipment_id
          }
        }
      )
      .then((results) => {
        return results;
      })
      .catch((err) => {
        return err;
      });
  }
  static updateEquipmentDetail({ id, serial_number, state, remark }) {
    return equipment_detail
      .update(
        {
          serial_number, 
          remark,
          state
        },
        {
          where: {
            id
          }
        }
      )
      .then((results) => {
        return results;
      })
      .catch((err) => {
        return err;
      });
  }
  static deleteEquipmentDetail(deleteList) {
    return equipment_detail
      .destroy({
        where: {
          id : deleteList
        }
      })
      .then((results) => {
        return results;
      })
      .catch((err) => {
        return err;
      });
  }
  static historyEquipment({ id }) {
    return equipment_reservation
    .findAll({
      include: [
        { 
          model: user,
          attributes: ['name']
        }
     ],
      where : {
        equipment_detail_id : id
      },
    })
    .then((results) => {
      return results;
    })
    .catch((err) => {
      return err;
    });
  }
  static findAlreadyEquipment({ category, kind, name }) {
    return equipment
      .findOne({
        raw: true,
        where : {
          category,
          kind,
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
  static insertEquipment({ category, kind, name }) {
    return equipment
      .create({
        raw: true,
        category, 
        kind, 
        name
      })
      .then((results) => {
        return results;
      })
      .catch((err) => {
        return err;
      });
  }
  static insertEquipmentDetail({ id, serial_number }) {
    return equipment_detail
      .create({
        raw: true,
        equipment_id : id,
        serial_number,
        state : 0,
        remark : ''
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
