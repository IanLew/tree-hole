const sequelize = require('../sequelize')
const letter = require('../schema/letter')
const letterlog = require('../schema/letterlog')

letter.hasMany(letterlog, {
  foreignKey: 'letterId'
})
letterlog.belongsTo(letter)

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
        exclude: ['receiver', 'read'],
        include: [
          [sequelize.literal(`(SELECT COUNT(*) FROM letterlog WHERE letterid = letter.id AND action = 2)`), 'shareTotal'],
          [sequelize.literal(`(SELECT COUNT(*) FROM letterlog WHERE letterid = letter.id AND (action = 0 OR action = 1))`), 'mannerTotal'],
          [sequelize.literal(`(SELECT COUNT(*) FROM letter as a WHERE a.replyId = letter.id)`), 'replyTotal']
        ]
      },
      where: {
        replyId
      },
      limit,
      offset
    })
  }

  static async getLettersByUser({ limit, offset, user, type }) {
    return await letter.findAndCountAll({
      attributes: {
        exclude: ['receiver', 'read'],
        include: [
          [sequelize.literal(`(SELECT COUNT(*) FROM letterlog WHERE letterid = letter.id AND action = 2)`), 'shareTotal'],
          [sequelize.literal(`(SELECT COUNT(*) FROM letterlog WHERE letterid = letter.id AND (action = 0 OR action = 1))`), 'mannerTotal'],
          [sequelize.literal(`(SELECT COUNT(*) FROM letter as a WHERE a.replyId = letter.id)`), 'replyTotal']
        ]
      },
      where: type ? {
        sender: user
      } : {
        receiver: user
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
