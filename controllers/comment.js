const model = require('../model');
const Comment = model.comment;
const Apply = model.apply;
const User = model.user;


exports.getBoardComment = async (ctx) => {
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
}