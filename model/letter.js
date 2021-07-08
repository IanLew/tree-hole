const sequelize = require('../sequelize')
const letter = require('../schema/letter')
const letterlog = require('../schema/letterlog')
const cuser = require('../schema/cuser')

letter.hasMany(letterlog, {
  foreignKey: 'letterId'
})
letterlog.belongsTo(letter, {
  foreignKey: 'letterId'
})

/**
 * 信笺模型
 */
class LetterModel {
  /**
   * 创建信笺
   * 必须字段：category | replyId | content | images | sender | receiver | read
   */
  static async createLetter(data) {
    return await letter.create({
      category: data.category,
      replyId: data.replyId,
      content: data.content,
      images: data.images,
      sender: data.sender,
      receiver: data.receiver,
      read: !!data.read
    })
  }

  /**
   * 通过id获取信笺信息、发布者信息、信笺操作计数
   * 条件字段：id
   */
  static async getLetterById(id) {
    return await letter.findOne({
      attributes: {
        include: [
          [sequelize.literal(`(SELECT COUNT(*) FROM letterlog WHERE letterid = letter.id AND action = 2)`), 'shareTotal'],
          [sequelize.literal(`(SELECT COUNT(*) FROM letterlog WHERE letterid = letter.id AND (action = 0 OR action = 1))`), 'mannerTotal'],
          [sequelize.literal(`(SELECT COUNT(*) FROM letter as a WHERE a.replyId = letter.id)`), 'replyTotal']
        ]
      },
      include: {
        model: cuser,
        attributes: ['avatar', 'nickname', 'account', 'manifesto']
      },
      where: {
        id
      }
    })
  }

  /**
   * 获取信笺列表、发布者信息、信笺操作计数
   * replyId为null时获取发布者信笺列表，否则获取回复信笺列表
   * 条件字段：replyId
   */
  static async getLetters({ limit, offset, replyId }) {
    return await letter.findAndCountAll({
      attributes: {
        exclude: ['receiver', 'read'],
        include: [
          [sequelize.literal(`(SELECT COUNT(*) FROM letterlog WHERE letterid = letter.id AND action = 2)`), 'shareTotal'],
          [sequelize.literal(`(SELECT COUNT(*) FROM letterlog WHERE letterid = letter.id AND (action = 0 OR action = 1))`), 'mannerTotal'],
          [sequelize.literal(`(SELECT COUNT(*) FROM letter as a WHERE a.replyId = letter.id)`), 'replyTotal']
        ]
      },
      include: {
        model: cuser,
        attributes: ['avatar', 'nickname', 'account', 'manifesto']
      },
      where: {
        replyId
      },
      limit,
      offset
    })
  }

  /**
   * 获取用户信笺列表
   * type为truly时获取用户发布信笺列表、发布者信息、信笺操作计数，否则获取回复信笺列表、回复信息
   * 条件字段：type为truly时sender，否则receiver
   */
  static async getLettersByUser({ limit, offset, user, type }) {
    if (type) {
      // 查找发布信笺
      return await letter.findAndCountAll({
        attributes: {
          exclude: ['receiver', 'read'],
          include: [
            [sequelize.literal(`(SELECT COUNT(*) FROM letterlog WHERE letterid = letter.id AND action = 2)`), 'shareTotal'],
            [sequelize.literal(`(SELECT COUNT(*) FROM letterlog WHERE letterid = letter.id AND (action = 0 OR action = 1))`), 'mannerTotal'],
            [sequelize.literal(`(SELECT COUNT(*) FROM letter as a WHERE a.replyId = letter.id)`), 'replyTotal']
          ]
        },
        include: {
          model: cuser,
          attributes: ['avatar', 'nickname', 'account']
        },
        where: {
          sender: user,
          replyId: null
        },
        limit,
        offset
      })
    } else {
      // 查找回复信笺
      return await letter.findAndCountAll({
        attributes: {
          exclude: ['receiver', 'read'],
          include: [
            [sequelize.literal(`(SELECT content FROM letter as a WHERE a.replyId = letter.id AND a.sender = letter.receiver ORDER BY updatedAt DESC LIMIT 1)`), 'replyContent']
          ]
        },
        include: {
          model: cuser,
          attributes: ['avatar', 'nickname', 'account']
        },
        where: {
          receiver: user,
          replyId: null
        },
        limit,
        offset
      })
    }
  }

  /**
   * 更新是否阅读
   * 参数ids为数组时进行批量修改，字符串时进行单个修改
   * 条件字段：id
   */
  static async updateRead(ids) {
    if (Array.isArray(ids)) {
      return await letter.bulkCreate(ids.map(v => {
        return {
          id: v
        }
      }))
    } else if (typeof ids === 'string') {
      return await letter.update({
        read: true
      }, {
        where: {
          id: ids
        }
      })
    }
  }
}

module.exports = LetterModel
