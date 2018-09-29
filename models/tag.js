const sequelize = require('../db')
const Sequelize = require('sequelize');
const Tag = sequelize.define('tag', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER(11)
    },
    name: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false
    }
})
module.exports = Tag;