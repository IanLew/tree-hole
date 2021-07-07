const jsonwebtoken = require('jsonwebtoken')
const CuserModel = require('../model/cuser')

class CuserController {
  static async create(ctx) {
    const req = ctx.request.body
    if (req.account && req.password) {
      try {
        const acc = await CuserModel.getUserByAccount(req.account)
        if (acc) {
          ctx.body = {
            code: 411,
            message: '账号已存在',
            data: null
          }
        } else {
          await CuserModel.createCuser(req)
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

  static async login(ctx) {
    const req = ctx.request.body
    try {
      const res = await CuserModel.getUser(req)
      if (res) {
        const token = jsonwebtoken.sign({
          id: res.id,
          account: req.account,
          password: req.jsonwebtoken
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

  static async profile(ctx) {
    const account = ctx.params.account
    if (account) {
      try {
        const res = await CuserModel.getProfileByAccount(account)
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

  static async password(ctx) {
    const req = ctx.request.body
    if (req && req.account && req.password) {
      try {
        const res = await CuserModel.updateProfile(req.account, {
          password: req.password
        })
        ctx.body = {
          code: 200,
          message: '密码修改成功',
          data: null
        }
      } catch(err) {
        ctx.body = {
          code: 412,
          message: err === 'account is not exsit' ? '账号不存在' : '密码修改失败',
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

  static async update(ctx) {
    const req = ctx.request.body
    if (req && req.account) {
      try {
        const account = req.account
        delete req.account
        await CuserModel.updateProfile(account, req)
        const res = await CuserModel.getProfileByAccount(account)
        ctx.body = {
          code: 200,
          message: '资料更新成功',
          data: res
        }
      } catch(err) {
        ctx.body = {
          code: 412,
          message: '资料更新失败',
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

module.exports = CuserController
