const letter = require('../schema/letter')

class LetterModel {
  static async createLetter(data) {
    return await letter.create({
      category: data.category,
      content: data.content,
      image: data.images,
      sender: data.sender,
      receiver: data.receiver,
      read: data.read
    })
  }

  static async getLetter(id) {
    return await letter.findOne({
      where: { id }
    })
  }
}

module.exports = LetterModel
