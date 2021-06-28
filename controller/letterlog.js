const LetterlogModel = require('../model/letterlog')

class LetterlogController {
  static async create(ctx) {
    const req = ctx.request.body
    if (req.letterId && req.action && req.operator) {
      try {
        await LetterlogModel.createLetterlog(req)
        ctx.response.status = 200
        ctx.body = {
          code: ctx.response.status,
          message: '创建成功',
          data: null
        }
      } catch(err) {
        ctx.response.status = 412
        ctx.body = {
          code: ctx.response.status,
          message: '创建失败',
          data: null
        }
      }
    } else {
      ctx.response.status = 416
      ctx.body = {
        code: ctx.response.status,
        message: '缺少必要参数',
        data: null
      }
    }
  }

  static async total(ctx) {
    const letterid = ctx.params.letterid
    if (letterid) {
      try {
        const res = await LetterlogModel.getLetterlogsTotal(letterid)
        ctx.response.status = 200
        ctx.body = {
          code: ctx.response.status,
          message: '查询成功',
          data: res
        }
      } catch(err) {
        ctx.response.status = 412
        ctx.body = {
          code: ctx.response.status,
          message: '查询失败',
          data: null
        }
      }
    } else {
      ctx.response.status = 416
      ctx.body = {
        code: ctx.response.status,
        message: '缺少必要参数',
        data: null
      }
    }
  }
}

module.exports = LetterlogController
