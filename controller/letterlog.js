const LetterlogModel = require('../model/letterlog')

class LetterlogController {
  static async create(ctx) {
    const req = ctx.request.body
    if (req.letterId && req.action && req.operator) {
      try {
        await LetterlogModel.createLetterlog(req)
        ctx.body = {
          code: 200,
          message: '创建成功',
          data: null
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
}

module.exports = LetterlogController
