const Sequelize = require('sequelize');
const config = require('./config')
console.log('init sequelize...');

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 300000
  }
});

module.exports = sequelize