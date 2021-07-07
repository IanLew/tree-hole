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

  static async getLettersByUser({ limit, offset, user, type }) {
    if (type) {
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
