const Sequelize = require('sequelize')
const sequelize = require('../db')
const {
    STRING,
    INTEGER,
    TEXT
} = Sequelize;
const Board = sequelize.define('board', {
    id: {
        type: INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: TEXT(),
        allowNull: false
    },
    sayId: {
        type: INTEGER(11),
        allowNull: false
    },
    toId: {
        type: INTEGER(11),
        allowNull: false
    }
})


module.exports = Board;