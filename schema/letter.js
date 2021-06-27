const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

module.exports = sequelize.define('letter', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  category: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'category',
    comment: '类型：0-树洞'
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'content',
    comment: '内容'
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'image',
    comment: '图片'
  },
  sender: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'sender',
    comment: '发送者'
  },
  receiver: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'receiver',
    comment: '接收者'
  },
  read: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    field: 'read',
    comment: '已读'
  }
}, {
  freezeTableName: true,
  timestamps: true
})
