const sequelize = require('../app/db')
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
      allowNull: false
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
      allowNull: false,
      defaultValue: '<p>这个人很懒，什么都没有留下</p>'
    },
    friends: {
      type: TEXT(),
      allowNull:false,
      defaultValue:'<p>暂时无友链</p>'
    },
    avatar: {
      type: STRING(255),
      defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-UUAYdKEoBCHc7G7PnJLg2oXkz-pfZ9UG5-etKoIwiW1UJMk0',
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

}
module.exports = User