const letterlog = require('../schema/letterlog')
const letter = require('../schema/letter')
const cuser = require('../schema/cuser')

class LetterlogModel {
  static async createLetterlog(data) {
    return await letterlog.create({
      letterId: data.letterId,
      action: data.action,
      operator: data.operator
    })
  }

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
}

module.exports = LetterlogModel
