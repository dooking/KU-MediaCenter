const sequelize = require('sequelize')
const { user } = require('../../models')
const { PER_PAGE } = require('../../utils/constant')

const UserDB = class {
    static getUser({id}) {
        return user.findOne({
            raw: true,
            where: {
                id
            },
        })
            .then((results) => {
                return results
            })
            .catch((err) => {
                return err
            })
    }
    static findUser(sub) {
        return user.findOne({
            raw: true,
            where: {
                identity: sub,
            },
        })
            .then((results) => {
                return [null, results]
            })
            .catch((err) => {
                return [err]
            })
    }
    static getUserLists({offset, searchWord}) {
        return user.findAll({
            raw: true,
            where:{
                name: {
                    [sequelize.Op.like]: "%" + searchWord + "%", 
                },
            },
            offset: offset,
            limit: PER_PAGE
        })
            .then((results) => {
                return results
            })
            .catch((err) => {
                return err
            })
    }
    static getUserLength({searchWord}) {
        return user.count({
            raw: true,
            where:{
                name: {
                    [sequelize.Op.like]: "%" + searchWord + "%", 
                },
            }
        })
            .then((results) => {
                return results
            })
            .catch((err) => {
                return err
            })
    }
    static insertUser({ identity, name, major }) {
        return user.create({
            raw: true,
            identity,
            name,
            major
        })
            .then((results) => {
                return [null, results]
            })
            .catch((err) => {
                return [err, null]
            })
    }
    static updatePenalty({ id, penalty }) {
        return user.update( 
            {
                raw: true,
                penalty
            },
            {
                where: {
                    id
                },
        })
            .then((results) => {
                return results
            })
            .catch((err) => {
                return err
            })
    }
    static updateAuth({ id, auth }) {
        return user.update( 
            {
                raw: true,
                auth
            },
            {
                where: {
                    id
                },
        })
            .then((results) => {
                return results
            })
            .catch((err) => {
                return err
            })
    }
}
module.exports = UserDB
