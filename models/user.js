const sequelize = require("../db.js");
const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "user", {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    userName: {
      type: Sequelize.STRING(255),
      unique: true,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    }
  }
);