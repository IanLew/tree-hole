const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

module.exports = sequelize.define('letterlog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  letterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'letterId',
    comment: '信笺id'
  },
  action: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'action',
    comment: '行为：0-否定 1-赞同 2-分享'
  },
  operator: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'operatorId',
    comment: '操作人编码'
  }
}, {
  freezeTableName: true,
  timestamps: true
})