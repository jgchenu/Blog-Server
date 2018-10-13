const sequelize = require('../db')
const Sequelize = require('sequelize');
const moment = require('moment')
const {
    INTEGER,
    STRING,
    DATE
} = Sequelize;
const Article = sequelize.define('article', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: INTEGER(11)
        },
        title: {
            type: STRING(255),
            allowNull: false
        },
        summary: {
            type: STRING(255),
        },
        readCount: {
            type: INTEGER(11),
            defaultValue: 0,
        },
        userId: {
            type: INTEGER(11),
            allowNull: false
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
        deletedAt: {
            type: DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        }

    },


)
Article.associate = function (models) {
    models.article.hasOne(models.content, {
        foreignKey: 'articleId',
        sourceKey: 'id',
        constraints: false,

    })
    models.article.hasMany(models.tag);
    models.article.hasMany(models.comment, {
        foreignKey: 'articleId',
        sourceKey: 'id',
        constraints: false,

    });

}
module.exports = Article;