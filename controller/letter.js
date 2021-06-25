const LetterModel = require('../model/letter')

class LetterController {
  static async create(ctx) {
    const req = ctx.request.body
    if (req.category && req.content && req.sender) {
      try {
        await LetterModel.createLetter(req)
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
          data: err
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

  static async detail(ctx) {
    const id = ctx.params.id
    if (id) {
      try {
        const res = await LetterModel.getLetter(id)
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
          data: err
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

module.exports = LetterController
