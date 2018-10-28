const sequelize = require('../app/db')
const Sequelize = require('sequelize');
const moment = require('moment')

const {
    INTEGER,
    STRING
} = Sequelize;
const Tag = sequelize.define('tag', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: INTEGER(11)
    },
    name: {
        type: STRING(255),
        unique: true,
        allowNull: false
    },
    articleId: {
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
})
Tag.associate = function (models) {
    models.tag.belongsTo(models.article, {
        foreignKey: 'articleId',
        targetKey: 'id',
    })
}
module.exports = Tag;