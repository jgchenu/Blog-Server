const model = require('../app/model');
const sequelize = require('../app/db')

const Article = model.article;
const Comment = model.comment
const Apply = model.apply
const Content = model.content;
const User = model.user
const Tag = model.tag;


class ArticleController {
    //获取所有文章
    static async getAllArticle(ctx) {
        let page = parseInt(ctx.request.query.page || 1);
        let pageSize = parseInt(ctx.request.query.pageSize || 10);
        let start = (page - 1) * pageSize;
        const data = await Article.findAll({
            order: [
                ['updatedAt', 'DESC'],
            ],
            include: [{
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
            code: 200,
            data,
            ...count.dataValues
        }

    }
    //获取文章详情
    static async getArticleDetail(ctx) {
        try {
            const id = ctx.params.id;
            const data = await Article.findOne({
                where: {
                    id
                },
                include: [{
                    model: Content,
                }, {
                    model: Tag
                }, {
                    model: Comment,
                    include: [{
                        model: Apply,
                        as: 'apply',
                        include: [{
                            model: User,
                            as: 'applySayUser',
                            attributes: {
                                exclude: ['password']
                            }
                        }, {
                            model: User,
                            as: 'applyToUser',
                            attributes: {
                                exclude: ['password']
                            }
                        }]
                    }, {
                        model: User,
                        as: 'sayUser',
                        attributes: {
                            exclude: ['password']
                        }
                    }]
                }]
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

    }
    //编辑文章
    static async editArticle(ctx) {
        try {
            const id = ctx.params.id;
            const requestData = ctx.request.body
            const articleData = await Article.update({
                title: requestData.title,
            }, {
                where: {
                    id
                },
                fields: ['title']
            })
            const contentData = await Content.update({
                value: requestData.content,
            }, {
                where: {
                    articleId: id
                },
                fields: ['value']
            })
            await Tag.destroy({
                where: {
                    articleId: id
                }
            })
            const tagData = await Tag.bulkCreate(requestData.tags.map(item => ({
                name: item,
                articleId: id
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

    }
    //发布文章
    static async subArticle(ctx) {
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
    //删除文章
    static async deleteArticle(ctx) {
        try {
            const id = ctx.params.id;
            const data = await Article.destroy({
                where: {
                    id
                },
            }, {
                force: false
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
    }
}
module.exports = ArticleController