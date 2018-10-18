const sequelize = require('../app/db')
const Sequelize = require('sequelize');
const moment = require('moment')

const {
    INTEGER,
    TEXT
} = Sequelize;
const Content = sequelize.define('content', {
    id: {
        type: INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    value: {
        type: TEXT()
    },
    articleId: {
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

module.exports = Content;