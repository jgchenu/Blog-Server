const sequelize = require('../db')
const Sequelize = require('sequelize');
const moment = require('moment')
const {
    INTEGER,
    STRING,
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

    },


)
Article.associate = function (models) {
    models.article.belongsTo(models.user, {
        foreignKey: 'userId',
        targetKey: 'id',
    })
    models.article.hasOne(models.content)
    models.article.hasMany(models.tag);
}
module.exports = Article;