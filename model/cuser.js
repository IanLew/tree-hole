const cuser = require('../schema/cuser')
const letter = require('../schema/letter')

cuser.hasMany(letter, {
  foreignKey: 'sender'
})
letter.belongsTo(cuser)

class CuserModel {
  static async createCuser(data) {
    return await cuser.create({
      account: data.account,
      password: data.password
    })
  }

  static async getUser(data) {
    return await cuser.findOne({
      attributes: {
        exclude: ['account', 'password']
      },
      where: {
        account: data.account,
        password: data.password
      }
    })
  }

  static async getUserByAccount(account) {
    return await cuser.findOne({
      attributes: ['id'],
      where: {
        account
      }
    })
  }

  static async getProfileByAccount(account) {
    return await cuser.findOne({
      attributes: {
        exclude: ['account', 'password']
      },
      where: {
        account
      }
    })
  }

  static async updateProfile(account, profile) {
    return await cuser.update(profile, {
      where: {
        account
      }
    })
  }
}

module.exports = CuserModel
