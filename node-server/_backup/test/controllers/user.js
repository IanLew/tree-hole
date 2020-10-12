const UserModel = require('../modules/user')

class UserController {
  static async create(ctx) {
    const req = ctx.request.body
    if (!req.nickname) {
      req.nickname = 'tourist'
    }
    try {
      const ret = await UserModel.createUser(req)
      const data = await UserModel.getUserById(ret.id)

      ctx.response.status = 200
      ctx.body = {
        code: 200,
        msg: '创建用户信息成功',
        data
      }
    } catch (err) {
      ctx.response.status = 412
      ctx.body = {
        code: 200,
        msg: '创建用户信息失败',
        data: err
      }
    }
  }
}

module.exports = UserController