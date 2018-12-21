const model = require('../app/model');
const sequelize = require('../app/db')
const Comment = model.comment;
const Apply = model.apply;
const User = model.user;
const Article = model.article;
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
// 评论处理（文章评论，留言板评论）
class CommentController {

    //获取留言板的评论
    static async getBoardComments(ctx) {
        let page = parseInt(ctx.request.query.page || 1);
        let pageSize = parseInt(ctx.request.query.pageSize || 10);
        let start = (page - 1) * pageSize;
        let data = await Comment.findAll({
            order: [
                ['updatedAt', 'DESC'],
            ],
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
            }],
            where: {
                articleId: null
            },
            offset: start,
            limit: pageSize
        })
        const count = await Comment.findOne({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            where: {
                articleId: null,
                commentType: 2
            }
        })
        ctx.body = {
            code: 0,
            data,
            ...count.dataValues
        }
    }
    //获取我发布文章收到的评论通知
    static async getCommentsLinkArticles(ctx) {
        let page = parseInt(ctx.request.query.page || 1);
        let pageSize = parseInt(ctx.request.query.pageSize || 10);
        let start = (page - 1) * pageSize;
        const data = await Comment.findAndCountAll({
            order: [
                ['updatedAt', 'DESC'],
            ],
            include: [{
                model: Article,
                as: 'article',
                required: true,
                where: {
                    deletedAt: null
                }
            }, {
                model: User,
                as: 'sayUser',
                required: true
            }],
            where: {
                articleId: {
                    [Op.ne]: null
                }
            },
            offset: start,
            limit: pageSize
        })

        ctx.body = {
            code: 0,
            data: data.rows,
            count: data.count
        }
    }
    //发布留言板文章评论回复
    static async subComment(ctx) {
        const reqBody = ctx.request.body;
        let content = reqBody.content;
        let toId = +(reqBody.toId);
        let commentType = +(reqBody.commentType);
        let commentId = +(reqBody.commentId);
        let articleId = +(reqBody.articleId);
        let sayId = +(ctx.state.user.userId);
        //如果为留言评论,文章评论
        if (!toId) {
            const commentData = await Comment.create({
                sayId,
                commentType,
                content,
                articleId: articleId ? articleId : null
            })
            return ctx.body = {
                code: 0,
                data: commentData
            }
        }
        //如果为留言评论回复，文章评论回复
        if (toId) {
            const applyData = await Apply.create({
                sayId,
                commentType,
                content,
                toId,
                commentId
            })
            return ctx.body = {
                code: 0,
                data: applyData
            }
        }
    }
}
module.exports = CommentController