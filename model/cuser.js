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

/**
 * 官网用户模型
 */
class CuserModel {
  /**
   * 创建用户
   * 必须字段：account | password | identity
   */
  static async createCuser(data) {
    return await cuser.create({
      account: data.account,
      password: data.password,
      identity: data.identity
    })
  }

  /**
   * 查询用户
   * 条件字段：account | password
   */
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
  
  /**
   * 随机获取除指定用户id之外的用户id
   * 条件字段：id
   */
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

  /**
   * 获取除密码外的用户信息
   * 条件字段：account
   */
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

  /**
   * 更新用户信息并返回除密码外的用户信息
   * 条件字段：account
   * profile为新的用户信息
   */
  static async updateProfile(account, profile) {
    return await cuser.update(profile, {
      where: {
        account
      }
    })
  }
}

module.exports = CuserModel
