const { Op } = require('sequelize')
const sequelize = require('../sequelize')
const cuser = require('../schema/cuser')
const letter = require('../schema/letter')
const letterlog = require('../schema/letterlog')

cuser.hasMany(letter, {
  foreignKey: 'sender'
})
letter.belongsTo(cuser, {
  foreignKey: 'sender'
})

cuser.hasMany(letterlog, {
  foreignKey: 'sender'
})
letterlog.belongsTo(cuser, {
  foreignKey: 'sender'
})

class CuserModel {
  static async createCuser(data) {
    return await cuser.create({
      account: data.account,
      password: data.password,
      identity: data.identity
    })
  }

  static async getUser(data) {
    return await cuser.findOne({
      attributes: {
        exclude: ['password']
      },
      where: {
        account: data.account,
        password: data.password
      }
    })
  }
  
  static async getUserRand(id) {
    return await cuser.findAll({
      attributes: ['id'],
      where: {
        id: {
          [Op.not]: id
        }
      },
      order: sequelize.random(),
      limit: 1
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
        exclude: ['password']
      },
      where: {
        account
      }
    })
  }

  static async updateProfile(account, profile) {
    const user = await cuser.findOne({
      attributes: {
        exclude: ['password']
      },
      where: {
        account
      }
    })
    if (user) {
      return await cuser.update(profile, {
        where: {
          account
        }
      })
    } else {
      return Promise.reject('account is not exsit')
    }
  }
}

module.exports = CuserModel
