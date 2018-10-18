const Sequelize = require('sequelize')
const sequelize = require('../app/db')
const moment = require('moment')

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
})


module.exports = Board;