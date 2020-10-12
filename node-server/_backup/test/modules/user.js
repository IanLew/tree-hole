const db = require('../config/db')
const user = db.sequelize.import('../schemas/user')

user.sync({
  force: false
})

class UserModel {
  static async createUser(data) {
    return await user.create({
      nickname: data.nickname,
      identity: data.identity,
      avatar: data.avatar,
      gender: data.gender,
      birthday: data.birthday,
      email: data.email,
      mobile: data.mobile,
      hobby: data.hobby
    })
  }

  static async getUserById(id) {
    return await user.findOne({
      where: {
        id
      }
    })
  }
}

module.exports = UserModel