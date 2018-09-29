const sequelize = require('../db')
const Sequelize = require('sequelize');
const User = require('./user');
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
    }
})
User.hasMany(Comment)
Comment.belongsTo(User)

module.exports = Comment;