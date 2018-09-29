const sequelize = require('../db')
const Sequelize = require('sequelize');
const {
    INTEGER,
    STRING,
} = Sequelize;
const Authority = sequelize.define('authority', {
    id: {
        type: INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: STRING(255)
    }
})
module.exports = Authority;