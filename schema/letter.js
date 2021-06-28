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
    allowNull: true,
    field: 'category',
    comment: '类型：1-树洞'
  },
  replyId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'replyId',
    comment: '回复信笺id'
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'content',
    comment: '内容'
  },
  images: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'images',
    comment: '图片'
  },
  sender: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'sender',
    comment: '发送者编码'
  },
  receiver: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'receiver',
    comment: '接收者编码'
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
