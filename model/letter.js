const { Op } = require('sequelize')
const sequelize = require('../sequelize')
const letter = require('../schema/letter')

class LetterModel {
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

  static async getLetterById(id) {
    return await letter.findOne({
      where: {
        id
      }
    })
  }

  static async getLetters({ limit, offset, replyId }) {
    return await letter.findAndCountAll({
      attributes: {
        exclude: ['receiver', 'read']
      },
      where: {
        replyId: replyId || {
          [Op.not]: null
        }
      },
      limit,
      offset
    })
  }

  static async getLettersData({ limit, offset }) {
    return await letter.findAll({
      attributes: {
        exclude: ['receiver', 'read'],
        include: [
          [sequelize.literal(`(SELECT COUNT(*) FROM letterlog WHERE letterid = id AND action = 2)`), 'shareTotal'],
          [sequelize.literal(`(SELECT COUNT(*) FROM letterlog WHERE letterid = id AND (action = 0 OR action = 1))`), 'actionTotal'],
          [sequelize.literal(`(SELECT COUNT(*) FROM letter WHERE replyId = id)`), 'replyTotal']
        ]
      },
      where: {
        replyId: {
          [Op.not]: null
        }
      },
      limit,
      offset
    })
  }

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
