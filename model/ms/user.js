const buser = require('../../schema/ms/user')

/**
 * 后台用户模型
 */
class BuserModel {
  /**
   * 创建用户
   * 必须字段：account | password | group
   */
  static async createBuser(data) {
    return await buser.create({
      account: data.account,
      password: data.password,
      authority: data.authority
    })
  }

  /**
   * 查询用户
   * 条件字段：account | password
   */
  static async getUser(data) {
    return await buser.findOne({
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
   * 获取除密码外的用户信息
   * 条件字段：account
   */
  static async getProfileByAccount(account) {
    return await buser.findOne({
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
    return await buser.update(profile, {
      where: {
        account
      }
    })
  }
  
  /**
   * 获取除用户权限数据
   * 条件字段：account
   */
  static async getAuthority(account) {
    return await buser.findOne({
      attributes: ['authority'],
      where: {
        account
      }
    })
  }

  /**
   * 更新用户权限数据
   * 条件字段：account
   * 必传字段：authority
   */
  static async updateAuthority(account, authority) {
    return await buser.update({
      authority
    }, {
      where: {
        account
      }
    })
  }

  /**
   * 查询所有用户
   */
  static async getUsers({ limit, offset, fields }) {
    return await buser.findAndCountAll({
      attributes: {
        exclude: ['password']
      },
      where: {
        account: fields.account,
        nickname: data.nickname
      },
      limit,
      offset
    })
  }
}

module.exports = BuserModel
