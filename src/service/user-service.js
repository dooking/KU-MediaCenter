const db = require('./DB/user')

// 유저 DB 저장
exports.insertUser = async (params) => {
    const user = db.insertUser(params)
    return user
}

// 유저 DB 조회
exports.findUser = async (userId) => {
    const user = await db.findUser(userId);
    return user;
};
