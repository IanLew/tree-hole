const bresource = require('../../schema/ms/resource')

/**
 * 后台资源数据模型
 */
class BresourceModel {
  /**
   * 创建资源数据
   * 必须字段：name | category
   */
  static async createBresource(data) {
    if (Array.isArray(data)) {
      return await bresource.bulkCreate(data)
    } else {
      return await bresource.create({
        name: data.name,
        url: data.url,
        icon: data.icon,
        category: data.category,
        floor: data.floor,
        order: data.order
      })
    }
  }

  /**
   * 获取资源数据
   */
  static async getBresource(data) {
    if (data.id) {
      return await bresource.findOne({
        where: {
          id: data.id
        }
      })
    } else {
      const params = {}
      if (data.category) {
        params.category = data.category
      }
      if (data.floor) {
        params.floor = data.floor
      }
      return await bresource.findAll({
        where: params
      })
    }
  }

  /**
   * 更新资源数据
   */
  static async updateBresource(data) {
    if (Array.isArray(data)) {
      return await bresource.bulkCreate(data, {
        updateOnDuplicate: ['name', 'url', 'icon', 'category', 'floor', 'order']
      })
    } else {
      return await bresource.update({
        name: data.name,
        url: data.url,
        icon: data.icon,
        category: data.category,
        floor: data.floor,
        order: data.order
      }, {
        where: {
          id: data.id
        }
      })
    }
  }
}

module.exports = BresourceModel