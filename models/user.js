const sequelize = require("../db.js");
const Sequelize = require("sequelize");
const {
  INTEGER,
  STRING,
  TINYINT
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
    }
  });
User.associate = function (models) {
  models.user.hasMany(models.article)
}
module.exports = User