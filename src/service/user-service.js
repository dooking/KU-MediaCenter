const { user } = require('../../models')

const UserDB = class {
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
}
module.exports = UserDB
