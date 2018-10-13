const sequelize = require('../db')
const Sequelize = require('sequelize');
const moment = require('moment')

const {
    INTEGER,
    TEXT,
    TINYINT,
    DATE
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
    // 评论类型：留言板或者文章评论    1-评论，2-留言板
    commentType: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 1
    },
    //所属的文章id
    articleId: {
        type: INTEGER(11),
    },
    createdAt: {
        type: DATE,
        get() {
            return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    updatedAt: {
        type: DATE,
        get() {
            return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    },

})

Comment.associate = function (models) {
    models.comment.hasMany(models.apply, {
        as: 'apply',
        foreignKey: 'commentId',
        sourceKey: 'id',
        constraints: false,
    })
    models.comment.belongsTo(models.user, {
        as: 'sayUser',
        foreignKey: 'sayId',
        targetKey: 'id',
        constraints: false,
    })
    models.comment.belongsTo(models.article, {
        as: 'article',
        foreignKey: 'articleId',
        targetKey: 'id',
        constraints: false,
    })
}
module.exports = Comment;