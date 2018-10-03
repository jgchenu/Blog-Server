const model = require('../model');
const sequelize = require('../db')

const Article = model.article;
const Comment = model.comment
const Content = model.content;
const User = model.user
const Tag = model.tag;

exports.getAllArticle = async (ctx) => {
    let page = parseInt(ctx.request.query.page || 1);
    let pageSize = parseInt(ctx.request.query.pageSize || 10);
    let start = (page - 1) * pageSize;
    const data = await Article.findAll({
        order: [
            ['updatedAt', 'DESC'],
        ],
        include: [{
            model: User,
        }, {
            model: Content,
        }, {
            model: Tag
        }],
        offset: start,
        limit: pageSize
    })
    const count = await Article.findOne({
        attributes: [
            [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
    })
    ctx.body = {
        data,
        ...count.dataValues
    }

}

exports.getArticleDetail = async (ctx) => {
    const id = ctx.params.id;
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
}
exports.subArticle = async (ctx) => {
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
        const data = { ...articleData.dataValues,
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

}