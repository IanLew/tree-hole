const { Op } = require('sequelize')
const letter = require('../schema/letter')
const letterlog = require('../schema/letterlog')

class LetterlogModel {
  static async createLetterlog(data) {
    return await letterlog.create({
      letterId: data.letterId,
      action: data.action,
      operator: data.operator
    })
  }

  static async getLetterlogsTotal(letterid) {
    const shareTotal = await letterlog.count({
      where: {
        letterid,
        action: 2
      }
    })
    const actionTotal = await letterlog.count({
      where: {
        letterid,
        action: {
          [Op.or]: [0, 1]
        }
      }
    })
    const replyTotal = await letter.count({
      where: {
        replyId: letterid
      }
    })
    return {
      shareTotal,
      actionTotal,
      replyTotal
    }
  }
}

module.exports = LetterlogModel
