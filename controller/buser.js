const jsonwebtoken = require('jsonwebtoken')
const BuserModel = require('../model/buser')

/**
 * 用户控制器
 */
class BuserController {
  /**
   * 创建用户
   * 必传字段：account | password
   */
  static async create(ctx) {
    const req = ctx.request.body
    if (req.account && req.password) {
      try {
        const acc = await BuserModel.getProfileByAccount(req.account)
        if (acc) {
          ctx.body = {
            code: 411,
            message: '账号已存在',
            data: null
          }
        } else {
          await BuserModel.createCuser(req)
          ctx.body = {
            code: 200,
            message: '创建成功',
            data: null
          }
        }
      } catch(err) {
        ctx.body = {
          code: 412,
          message: '创建失败',
          data: null
        }
      }
    } else {
      ctx.body = {
        code: 416,
        message: '缺少必要参数',
        data: null
      }
    }
  }

  /**
   * 登录，返回用户信息、登录token
   * 必传字段：account | password
   */
  static async login(ctx) {
    const req = ctx.request.body
    try {
      const res = await BuserModel.getUser(req)
      if (res) {
        // 生成token
        const token = jsonwebtoken.sign({
          id: res.id,
          account: req.account,
          password: req.password
        }, 'tree-hole', {
          expiresIn: '7d'
        })
        ctx.body = {
          code: 200,
          message: '登录成功',
          data: {
            userinfo: res,
            token
          }
        }
      } else {
        ctx.body = {
          code: 410,
          message: '账号或密码错误',
          data: null
        }
      }
    } catch(err) {
      ctx.body = {
        code: 412,
        message: '登录失败',
        data: null
      }
    }
  }

  /**
   * 获取用户信息
   * 必传字段：account
   */
  static async profile(ctx) {
    const account = ctx.params.account
    if (account) {
      try {
        const res = await BuserModel.getProfileByAccount(account)
        ctx.body = {
          code: 200,
          message: '查询成功',
          data: res
        }
      } catch(err) {
        ctx.body = {
          code: 412,
          message: '查询失败',
          data: null
        }
      }
    } else {
      ctx.body = {
        code: 416,
        message: '缺少必要参数',
        data: null
      }
    }
  }

  /**
   * 修改密码
   * 必传字段：account | password
   */
  static async password(ctx) {
    const req = ctx.request.body
    if (req && req.account && req.password) {
      try {
        const acc = await BuserModel.getProfileByAccount(req.account)
        if (acc) {
          await BuserModel.updateProfile(req.account, {
            password: req.password
          })
          ctx.body = {
            code: 200,
            message: '密码修改成功',
            data: null
          }
        } else {
          ctx.body = {
            code: 411,
            message: '账号不存在',
            data: null
          }
        }
      } catch(err) {
        ctx.body = {
          code: 412,
          message: '密码修改失败',
          data: null
        }
      }
    } else {
      ctx.body = {
        code: 416,
        message: '缺少必要参数',
        data: null
      }
    }
  }

  /**
   * 修改用户信息，返回修改后用户信息
   * 必传字段：account
   */
  static async update(ctx) {
    const req = ctx.request.body
    if (req && req.account) {
      try {
        const account = req.account
        delete req.account
        await BuserModel.updateProfile(account, req)
        const res = await BuserModel.getProfileByAccount(account)
        ctx.body = {
          code: 200,
          message: '信息更新成功',
          data: res
        }
      } catch(err) {
        ctx.body = {
          code: 412,
          message: '信息更新失败',
          data: null
        }
      }
    } else {
      ctx.body = {
        code: 416,
        message: '缺少必要参数',
        data: null
      }
    }
  }
}

module.exports = BuserController
