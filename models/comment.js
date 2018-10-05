const sequelize = require('../db')
const Sequelize = require('sequelize');
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
    // 评论类型：留言板，或者文章评论 0-文章评论，1留言板
    commentType: {
        type: TINYINT(1),
        allowNull: false
    },
    //所属的文章id
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

Comment.associate = function (models) {
    models.comment.belongsTo(models.article, {
        foreignKey: 'articleId',
        targetKey: 'id',
    })
    models.comment.belongsTo(models.user, {
        foreignKey: 'sayId',
        targetKey: 'id',
    })
    models.comment.belongsTo(models.user, {
        foreignKey: 'toId',
        targetKey: 'id',
    })
    models.comment.hasMany(models.apply)

}
module.exports = Comment;