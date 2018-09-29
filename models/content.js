const sequelize = require('../db')
const Sequelize = require('sequelize');
const Content = sequelize.define('Content', {
    id:{
        type:Sequelize.INTEGER(11),
        autoIncrement:true,
        primaryKey:true
    },
    value:{
        type:Sequelize.TEXT()
    }
})
module.exports=Content;