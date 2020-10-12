
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      comment: 'id'
    },
    nickname: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: 'nickname'
    },
    identity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: 'identity'
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'avatar'
    },
    gender: {
      type: DataTypes.BOOLEAN,
      comment: 'gender'
    },
    birthday: {
      type: DataTypes.STRING(10),
      comment: 'birthday'
    },
    email: {
      type: DataTypes.STRING,
      comment: 'email'
    },
    mobile: {
      type: DataTypes.STRING(11),
      comment: 'mobile'
    },
    hobby: {
      type: DataTypes.STRING,
      comment: 'hobby'
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