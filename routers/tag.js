const Router = require('koa-router')
const model = require('../model');
const sequelize = require('../db')
const Article = model.article;
const Comment = model.comment
const Content = model.content;
const User = model.user
const Tag = model.tag;
let router = new Router()

router.get('/', async (ctx) => {
    try {
        const data = await Tag.findAll({
            attributes: ['name',
                [sequelize.fn('COUNT', sequelize.col('name')), 'count']
            ],
            group: 'name'
        })
        ctx.body = {
            code: 200,
            data
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            message: error
        }
    }

})
router.get('/:name', async (ctx) => {
    try {

    } catch (error) {

    }
})
module.exports = router