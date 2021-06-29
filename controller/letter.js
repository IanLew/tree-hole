const LetterModel = require('../model/letter')

class LetterController {
  static async create(ctx) {
    const req = ctx.request.body
    if ((req.category || req.replyId) && req.content && req.sender) {
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

  static async detail(ctx) {
    const id = ctx.params.id
    if (id) {
      try {
        const res = await LetterModel.getLetterById(id)
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

  static async list(ctx) {
    let { pageNo, pageSize, fields } = ctx.query
    pageNo = pageNo || 1
    pageSize = pageSize || 10
    try {
      const res = await LetterModel.getLetters({
        offset: (pageNo - 1) * pageNo,
        limit: pageSize,
        replyId: fields ? fields.replyId : null
      })
      ctx.response.status = 200
      ctx.body = {
        code: ctx.response.status,
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
      ctx.response.status = 412
      ctx.body = {
        code: ctx.response.status,
        message: '查询失败',
        data: null
      }
    }
  }

  static async datas(ctx) {
    let { pageNo, pageSize } = ctx.query
    pageNo = pageNo || 1
    pageSize = pageSize || 10
    try {
      const res = await LetterModel.getLettersData({
        offset: (pageNo - 1) * pageNo,
        limit: pageSize
      })
      console.log(res)
      ctx.response.status = 200
      ctx.body = {
        code: ctx.response.status,
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
      ctx.response.status = 412
      ctx.body = {
        code: ctx.response.status,
        message: '查询失败',
        data: null
      }
    }
  }

  static async read(ctx) {
    const ids = ctx.query.ids
    if (ids) {
      try {
        await LetterModel.updateRead(ids)
        ctx.response.status = 200
        ctx.body = {
          code: ctx.response.status,
          message: '状态更新成功',
          data: null
        }
      } catch(err) {
        ctx.response.status = 412
        ctx.body = {
          code: ctx.response.status,
          message: '状态更新失败',
          data: null
        }
      }
    } else {
      ctx.response.status = 412
      ctx.body = {
        code: ctx.response.status,
        message: '参数错误',
        data: null
      }
    }
  }
}

module.exports = LetterController
