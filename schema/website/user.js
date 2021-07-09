const { DataTypes } = require('sequelize')
const sequelize = require('../../sequelize')

module.exports = sequelize.define('cuser', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  identity: {
    type: DataTypes.INTEGER(1),
    allowNull: false,
    field: 'identity',
    comment: '角色身份 0-系统 1-用户'
  },
  account: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'account',
    comment: '账号'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'password',
    comment: '密码'
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'nickname',
    comment: '昵称'
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'avatar',
    comment: '头像'
  },
  sex: {
    type: DataTypes.INTEGER(1),
    allowNull: true,
    field: 'sex',
    comment: '性别 0-女 1-男 3-保密'
  },
  birthday: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'birthday',
    comment: '生日'
  },
  manifesto: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'manifesto',
    comment: '签名'
  }
}, {
  freezeTableName: true,
  timestamps: true
})
