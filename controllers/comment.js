const model = require('../model');
const Comment = model.comment;
const Apply = model.apply;
const User = model.user;


exports.getBoardComment = async (ctx) => {
    try {
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
exports.subComment = async (ctx) => {
    try {
        let {
            sayId,
            toId,
            content,
            commentType,
            commentId
        } = ctx.request.body;
        //对获得的字段格式化
        sayId = parseInt(sayId)
        toId = parseInt(toId)
        commentType = parseInt(commentType)
        commentId = parseInt(commentId)
        //如果为留言评论
        if (!toId && commentType === 2) {
            const commentData = await Comment.create({
                sayId,
                commentType,
                content
            })
            console.log(commentData)
            ctx.body = {
                code: 200,
                data: commentData
            }
        }
        //如果为留言评论回复
        if (toId && commentType === 2) {
            const applyData = await Apply.create({
                sayId,
                commentType,
                content,
                toId,
                commentId
            })
            ctx.body = {
                code: 200,
                data: applyData
            }
        }
        //如果为文章评论

        //如果为文章评论回复
    } catch (error) {
        ctx.body = {
            code: 500,
            message: error
        }
    }

}