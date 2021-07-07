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

  static async list(ctx) {
    let { pageNo, pageSize, fields } = ctx.request.body
    pageNo = pageNo || 1
    pageSize = pageSize || 10
    if (fields && fields.user) {
      try {
        const res = await LetterlogModel.getLetterlogsByUser({
          offset: (pageNo - 1) * pageNo,
          limit: pageSize,
          user: fields.user
        })
        ctx.body = {
          code: 200,
          message: '查询成功',
          data: {
            pageNo,
            pageSize,
            pages: Math.ceil(res.count / pageSize),
            total: res.count,
            list: res.rows.map(v => {
              v.images = v.images ? v.images.split('|') : []
              return v
            })
          }
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
}

module.exports = LetterlogController
