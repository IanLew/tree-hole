const letterlog = require('../../schema/website/letterlog')
const letter = require('../../schema/website/letter')
const cuser = require('../../schema/website/user')

/**
 * 信笺行为记录模型
 */
class LetterlogModel {
  /**
   * 创建信笺行为记录
   * 必须字段：letterId | action | sender | receiver
   */
  static async createLetterlog(data) {
    return await letterlog.create({
      letterId: data.letterId,
      action: data.action,
      sender: data.sender,
      receiver: data.receiver
    })
  }

  /**
   * 通过用户id获取行为记录、信笺内容、操作人
   * 条件字段：receiver
   */
  static async getLetterlogsByUser({ limit, offset, user }) {
    return await letterlog.findAndCountAll({
      include: [
        {
          model: letter,
          attributes: ['content'],
        },
        {
          model: cuser,
          attributes: ['avatar', 'nickname', 'account', 'manifesto']
        }
      ],
      where: {
        receiver: user
      },
      limit,
      offset
    })
  }

  /**
   * 获取所有行为记录、信笺内容、操作人
   * 条件字段：letterId | receiver | sender
   */
  static async getAllLetterlogs({ limit, offset, fields }) {
    const params = {}
    if (fields.letterId) {
      params.letterId = fields.letterId
    }
    if (fields.receiver) {
      params.receiver = fields.receiver
    }
    if (fields.sender) {
      params.sender = fields.sender
    }
    return await letterlog.findAndCountAll({
      include: {
        model: cuser,
        attributes: ['avatar', 'nickname', 'account', 'manifesto']
      },
      where: params,
      limit,
      offset
    })
  }
}

module.exports = LetterlogModel
