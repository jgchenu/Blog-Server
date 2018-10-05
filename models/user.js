const sequelize = require("../db.js");
const Sequelize = require("sequelize");
const moment = require('moment')

const {
  INTEGER,
  STRING,
  TINYINT,
  TEXT
} = Sequelize;
const User = sequelize.define(
  "user", {
    id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    userName: {
      type: STRING(255),
      unique: true,
    },
    password: {
      type: STRING(255),
      allowNull: false,
    },
    authority: {
      type: TINYINT(1),
      allowNull: false,
      defaultValue: 0
    },
    introduction: {
      type: TEXT(),
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    updatedAt: {
      type: Sequelize.DATE,
      get() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  });
User.associate = function (models) {
  models.user.hasMany(models.article)
  models.user.hasMany(models.comment)
  models.user.hasMany(models.apply)
}
module.exports = User