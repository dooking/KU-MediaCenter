const sequelize = require('sequelize')
const { user, studio, studio_detail, studio_reservation } = require('../../models');
const { PER_PAGE } = require('../../utils/constant')

const StudioDB = class {
  static getStudioCategoryLists() {
    return studio
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
  static getStudioLists({ offset,searchWord }) {
    return studio_detail
      .findAll({
        include: [
          { 
            model: studio,
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
  static getAllStudiosCount({ searchWord }){
    return studio_detail
      .count({
        raw: true,
        include: [
          { 
            model: studio,
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
  static getStudioCount(id){
    return studio_detail
      .count({
        raw: true,
        where : {
          studio_id : id,
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
  static getStudio({id}) {
    return studio
    .findOne({
     raw: true,
     where : {
       id
     }
    })
    .then((results) => {
      return results;
    })
    .catch((err) => {
      return err;
    });
  }
  static getStudioDetail({id}) {
    return studio_detail
    .findOne({
      include: [
        { 
          model: studio,
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
  static getStudioId(name) {
    return studio
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
    return studio_reservation
      .findAll({
        raw: true, 
        attributes: ['from_date', 'to_date'],
        where : {
            studio_detail_id : id,
          state : {
            [sequelize.Op.or]: [0,1,3,5]
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
  static insertReservation({studioDetailId, userId, reservationNumber, fromDate, toDate, group, phone, purpose, auth, remark }){
    return studio_reservation.create({
      raw: true,
      studio_detail_id : studioDetailId, 
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
    return studio_reservation
      .findAll({
        raw: true,  
        nest: true,
        attributes: ['id','user_id', 'reservation_number', 'from_date', 'to_date'],
        where : {
          state
        },
        include: [
          { 
            model: user,
            attributes: ['name']
          },
          { 
            model: studio_detail,
            attributes: ['id']
          },
       ],        

      })
      .then((results) => {
        return results;
      })
      .catch((err) => {
        return err;
      });
  }
  static updateStudio({ studio_id, category, name }) {
    return studio
      .update(
        {
          category, 
          name
        },
        {
          where: {
            id: studio_id
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
  static updateStudioDetail({ id, state, remark }) {
    return studio_detail
      .update(
        {
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
  static deleteStudioDetail(deleteList) {
    return studio_detail
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
  static historyStudio({ id }) {
    return studio_reservation
    .findAll({
      include: [
        { 
          model: user,
          attributes: ['name']
        }
     ],
      where : {
        studio_detail_id : id
      },
      order: [
        ['reservation_number','ASC'],
        ['from_date','ASC'],
      ],
    })
    .then((results) => {
      return results;
    })
    .catch((err) => {
      return err;
    });
  }
  static historyUser({ id }) {
    return studio_reservation
    .findAll({
      include: [
        { 
          model: user,
          attributes: ['name']
        }
     ],
      where : {
        user_id : id
      },
      order: [
        ['reservation_number','ASC'],
        ['from_date','ASC'],
      ],
    })
    .then((results) => {
      return results;
    })
    .catch((err) => {
      return err;
    });
  }
  static findAlreadyStudio({ category, name }) {
    return studio
      .findOne({
        raw: true,
        where : {
          category,
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
  static insertStudio({ category, name }) {
    return studio
      .create({
        raw: true,
        category, 
        name
      })
      .then((results) => {
        return results;
      })
      .catch((err) => {
        return err;
      });
  }
  static insertStudioDetail({ id }) {
    return studio_detail
      .create({
        raw: true,
        studio_id : id,
        state : 0,
        remark : '',
      })
      .then((results) => {
        return results;
      })
      .catch((err) => {
        return err;
      });
  }
};
module.exports = StudioDB;
