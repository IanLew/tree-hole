const db = require('../config/db')
const userAuth = db.sequelize.import('../schemas/user_auth')

userAuth.sync({
  force: false
})

class UserAuthModel {
  static async createAccount(data) {
    return await userAuth.create({
      account: data.account,
      password: data.password
    })
  }
}

module.exports = UserAuthModel