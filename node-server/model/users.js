const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database/index');

const users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  userid: {
    type: DataTypes.INTEGER,
    comment: '用户id'
  },
  nickname: {
    type: DataTypes.STRING(100),
    comment: '昵称'
  },
  identity: {
    type: DataTypes.INTEGER(1),
    defaultValue: 0,
    comment: '身份：0-开发者，1-倾听者，2-倾述者，3-执法者'
  },
  avatar: {
    type: DataTypes.STRING,
    comment: '头像'
  },
  gender: {
    type: DataTypes.INTEGER(1),
    comment: '性别'
  },
  birthday: {
    type: DataTypes.STRING(10),
    comment: '生日'
  },
  email: {
    type: DataTypes.STRING,
    comment: '邮箱'
  },
  mobile: {
    type: DataTypes.STRING(11),
    comment: '手机号'
  },
  province: {
    type: DataTypes.STRING,
    comment: '所在省份'
  },
  city: {
    type: DataTypes.STRING,
    comment: '所在城市'
  },
  district: {
    type: DataTypes.STRING,
    comment: '所在地区'
  },
  address: {
    type: DataTypes.STRING,
    comment: '详细地址'
  },
  hobby: {
    type: DataTypes.STRING,
    comment: '兴趣爱好'
  }
}, {
  freezeTableName: true,
  timestamps: true
});

users.sync({
  force: false
});

module.exports = users;