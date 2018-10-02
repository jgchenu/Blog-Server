const Router = require('koa-router')
const model = require('../model');
const Article = model.article;
const Comment = model.comment
const Content = model.content;
const User = model.user
const Tag = model.tag;
// const Sequelize = require('sequelize')
let router = new Router()
//文章列表获取
router.get('/', async (ctx) => {
    const data = await Article.findAll({
        include: [{
            model: User,
        }, {
            model: Content,
        }, {
            model: Tag
        }]
    })
    ctx.body = {
        data
    }
})
//文章详情获取
router.get('/:id', async (ctx) => {
    const id = ctx.params.id;
    console.log(ctx.params)
    const data = await Article.findOne({
        where: {
            id
        },
        include: [{
            model: User,
        }, {
            model: Content,
        }, {
            model: Tag
        }]
    })
    ctx.body = {
        code: 200,
        data
    }
})
//文章发布
router.post('/', async (ctx) => {
    try {
        const requestData = ctx.request.body
        const articleData = await Article.create({
            title: requestData.title,
            userId: 1
        })
        const contentData = await Content.create({
            value: requestData.content,
            articleId: articleData.id
        })
        const tagData = await Tag.bulkCreate(requestData.tags.map(item => ({
            name: item,
            articleId: articleData.id
        })))
        const data = { ...articleData,
            content: contentData,
            tag: tagData
        }
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
module.exports = router;