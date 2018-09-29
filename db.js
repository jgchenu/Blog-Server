const Sequelize = require('sequelize');
const config = require('./config')

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000
  },
  define: {
    timestamps: true,
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci",
    underscored: false,
    constraints: false
  }
});

module.exports = sequelize