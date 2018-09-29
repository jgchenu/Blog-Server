const sequelize = require('../db')
const Sequelize = require('sequelize');
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
})
Content.associate = function (models) {
    models.content.belongsTo(models.article, {
        foreignKey: 'articleId',
        targetKey: 'id',
    })
}
module.exports = Content;