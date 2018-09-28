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
    }
})
module.exports = Article;