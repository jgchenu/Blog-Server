const Router = require('koa-router')
const model = require('../model');
const Article = model.article;
const Comment = model.comment
const Content = model.content;
const User = model.user
const Sequelize = require('sequelize')
let router = new Router()
router.get('/', async (ctx) => {
    const data = await Article.findAll({
        include: [{
            model: User,
        }, {
            model: Content,
        }]
    })
    ctx.body = {
        data
    }
})
module.exports = router;