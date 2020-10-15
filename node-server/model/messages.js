const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const messages = sequelize.define('messages', {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    comment: 'id'
  },
  from: {
    type: DataTypes.INTEGER,
    comment: '发送消息的用户id'
  },
  to: {
    type: DataTypes.INTEGER,
    comment: '接收消息的用户id'
  },
  transparency: {
    type: DataTypes.INTEGER,
    comment: '消息透明度：0-不公开，1-半公开，2-全公开'
  },
  isread: {
    type: DataTypes.BOOLEAN,
    comment: '是否阅读'
  },
  content: {
    type: DataTypes.STRING,
    comment: '消息内容'
  }
}, {
  freezeTableName: true,
  timestamps: true
});

messages.sync({
  force: false
});

module.exports = messages;