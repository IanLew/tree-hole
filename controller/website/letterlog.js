const LetterlogModel = require('../../model/website/letterlog')

/**
 * 信笺行为记录控制器
 */
class LetterlogController {
  /**
   * 创建记录
   * 必传字段：letterId | action | sender | receiver
   */
  static async create(ctx) {
    const req = ctx.request.body
    if (req.letterId && req.action && req.sender && req.receiver) {
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

  /**
   * 获取记录列表
   * 必传参数：user(用户id)
   */
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

  /**
   * 获取行为记录列表
   */
  static async getAllLetterlogs(ctx) {
    let { pageNo, pageSize, fields } = ctx.request.body
    pageNo = pageNo || 1
    pageSize = pageSize || 10
    try {
      const res = await LetterlogModel.getAllLetterlogs({
        offset: (pageNo - 1) * pageNo,
        limit: pageSize,
        fields: fields || {}
      })
      ctx.body = {
        code: 200,
        message: '查询成功',
        data: {
          pageNo,
          pageSize,
          pages: Math.ceil(res.count / pageSize),
          total: res.count,
          list: res.rows
        }
      }
    } catch(err) {
      ctx.body = {
        code: 412,
        message: '查询失败',
        data: null
      }
    }
  }
}

module.exports = LetterlogController
