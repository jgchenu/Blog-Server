const sequelize = require('../db')
const Sequelize = require('sequelize');
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