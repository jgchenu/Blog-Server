const sequelize = require('../db')
const Sequelize = require('sequelize');
const Article = sequelize.define('article', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER(11)
    },
    contentId: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    tags: {
        type: Sequelize.STRING(255)
    },
    comments: {
        type: Sequelize.STRING(255)
    },
    summary: {
        type: Sequelize.STRING(),
        validate: {
            min: 2,
            max: 255,
        },
    },
    readSize: {
        type: Sequelize.INTEGER(),
        defaultValue: 0,
    },
})
Article.associate = function () {
    Article.belongsTo(User);
    Article.belongsTo(Catalog);
    Article.hasMany(Comment, {
        as: 'comment',
    });
};
module.exports = Article;