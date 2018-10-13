const sequelize = require('../db')
const Sequelize = require('sequelize');
const User = require('./user');
const moment = require('moment')

const {
    INTEGER,
    TEXT,
    TINYINT
} = Sequelize;
const Apply = sequelize.define('apply', {
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
        allowNull: false,
    },
    //所属的评论id
    commentId: {
        type: INTEGER(11),
        allowNull: false
    },
    toId: {
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
    },
})
Apply.associate = function (models) {
    // models.apply.hasMany(models.user, {
    //     as: 'applyToUser',
    //     foreignKey: 'id',
    //     sourceKey: 'toId'
    // })
    // models.apply.hasMany(models.user, {
    //     as: 'applySayUser',
    //     foreignKey: 'id',
    //     sourceKey: 'sayId'
    // })
    models.apply.belongsTo(models.user, {
        as: 'applyToUser',
        foreignKey: 'toId',
        targetKey: 'id',
        constraints: false,
    })
    models.apply.belongsTo(models.user, {
        as: 'applySayUser',
        foreignKey: 'sayId',
        targetKey: 'id',
        constraints: false,
    })
}


module.exports = Apply;