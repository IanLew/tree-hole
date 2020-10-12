
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      comment: 'id'
    },
    account: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: 'account'
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: 'password'
    },
    createAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'create time'
    },
    updateAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'update time'
    }
  }, {
    timestamps: false
  })
}