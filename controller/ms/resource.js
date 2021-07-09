const BresourceModel = require('../../model/ms/resource')

/**
 * 解析资源树
 */
function parseResourceTree(tree) {
  tree.map(v => {
    if (v.children && v.children.length > 0) {
      const res = parseResourceTree(v.children)
      delete v.children
      tree.push(...res)
    } else {
      return {
        name: v.name,
        category: v.category
      }
    }
  })
  return tree
}

/**
 * 后台资源数据控制器
 */
class BresourceController {
  /**
   * 创建资源数据
   * 必传字段：name | category
   */
  static async create(ctx) {
    let req = ctx.request.body
    let exist = req.name && req.category
    if (Array.isArray(req)) {
      const res = parseResourceTree(req).filter(v => v.name && v.category)
      exist = res.length > 0
      req = exist ? res : null
    }
    if (exist) {
      try {
        await BresourceModel.createBresource(req) 
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
   * 获取资源数据
   */
  static async getBresource(ctx) {
    let req = ctx.request.query
    try {
      await BresourceModel.getBresource(req) 
      ctx.body = {
        code: 200,
        message: '查询成功',
        data: null
      }
    } catch(err) {
      ctx.body = {
        code: 412,
        message: '查询失败',
        data: null
      }
    }
  }

  /**
   * 更新资源数据
   */
  static async updateBresource(ctx) {
    let req = ctx.request.body
    let exist = req.name && req.category
    if (Array.isArray(req)) {
      const res = parseResourceTree(req).filter(v => v.name && v.category)
      exist = res.length > 0
      req = exist ? res : null
    }
    if (exist) {
      try {
        await BresourceModel.updateBresource(req) 
        ctx.body = {
          code: 200,
          message: '数据更新成功',
          data: null
        }
      } catch(err) {
        ctx.body = {
          code: 412,
          message: '数据更新失败',
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

module.exports = BresourceController
