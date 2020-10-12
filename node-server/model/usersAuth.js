const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const usersAuth = sequelize.define('users_auth', {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    comment: 'id'
  },
  userid: {
    type: DataTypes.INTEGER,
    comment: '用户id'
  },
  account: {
    type: DataTypes.STRING(100),
    comment: '登录账号'
  },
  account_type: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '用户账号：0-注册'
  },
  password: {
    type: DataTypes.STRING,
    comment: '登录凭证'
  }
}, {
  freezeTableName: true,
  timestamps: true
});

usersAuth.sync({
  force: false
});

module.exports = usersAuth;