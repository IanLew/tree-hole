const { DataTypes } = require('sequelize')
const sequelize = require('../../sequelize')

module.exports = sequelize.define('bresource', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name',
    comment: '名称'
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'url',
    comment: '地址'
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'icon',
    comment: '图标'
  },
  category: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'category',
    comment: '类型 0-按钮 1-菜单 2-其他'
  },
  floor: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'floor',
    comment: '层级'
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'order',
    comment: '排序'
  }
}, {
  freezeTableName: true,
  timestamps: true
})
