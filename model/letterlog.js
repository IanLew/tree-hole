const letterlog = require('../schema/letterlog')

class LetterlogModel {
  static async createLetterlog(data) {
    return await letterlog.create({
      letterId: data.letterId,
      action: data.action,
      operator: data.operator
    })
  }
}

module.exports = LetterlogModel
