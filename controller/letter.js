const LetterModel = require('../model/letter')
const CuserModel = require('../model/cuser')

class LetterController {
  static async create(ctx) {
    const req = ctx.request.body
    if ((req.category || req.replyId) && req.content && req.sender) {
      try {
        if (Array.isArray(req.images)) {
          req.images = req.images.join('|')
        }
        if (req.replyId) {
          await LetterModel.createLetter(req)
          ctx.body = {
            code: 200,
            message: '创建成功',
            data: null
          }
        } else {
          const user = await CuserModel.getUserRand(req.sender)
          if (user && user.length > 0) {
            req.receiver = user[0].id
            await LetterModel.createLetter(req)
            ctx.body = {
              code: 200,
              message: '创建成功',
              data: null
            }
          } else {
            ctx.body = {
              code: 412,
              message: '创建失败',
              data: null
            }
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

  static async detail(ctx) {
    const id = ctx.params.id
    if (id) {
      try {
        const res = await LetterModel.getLetterById(id)
        res.images = res.images ? res.images.split('|') : []
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

  static async list(ctx) {
    let { pageNo, pageSize, fields } = ctx.request.body
    pageNo = pageNo || 1
    pageSize = pageSize || 10
    try {
      const res = await LetterModel.getLetters({
        offset: (pageNo - 1) * pageNo,
        limit: pageSize,
        replyId: fields && fields.replyId || null
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
  }

  static async mylist(ctx) {
    let { pageNo, pageSize, fields } = ctx.request.body
    pageNo = pageNo || 1
    pageSize = pageSize || 10
    if (fields && fields.user) {
      try {
        const res = await LetterModel.getLettersByUser({
          offset: (pageNo - 1) * pageNo,
          limit: pageSize,
          user: fields.user,
          type: fields.type || 0
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

  static async read(ctx) {
    const ids = ctx.request.body
    if (ids) {
      try {
        await LetterModel.updateRead(ids)
        ctx.body = {
          code: 200,
          message: '状态更新成功',
          data: null
        }
      } catch(err) {
        ctx.body = {
          code: 412,
          message: '状态更新失败',
          data: null
        }
      }
    } else {
      ctx.body = {
        code: 416,
        message: '参数错误',
        data: null
      }
    }
  }
}

module.exports = LetterController
