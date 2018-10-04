const sequelize = require('../db')
const Sequelize = require('sequelize');
const User = require('./user');
const moment = require('moment')

const {
    INTEGER,
    TEXT,
    TINYINT
} = Sequelize;
const Comment = sequelize.define('comment', {
    id: {
        primaryKey: true,
        type: INTEGER(11),
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
    articleId: {
        type: INTEGER(11),
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
User.hasMany(Comment)
Comment.belongsTo(User)

module.exports = Comment;