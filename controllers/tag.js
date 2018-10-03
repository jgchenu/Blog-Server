const model = require('../model');
const sequelize = require('../db')
const Article = model.article;
const Comment = model.comment
const Content = model.content;
const User = model.user
const Tag = model.tag;
exports.getTag = async (ctx) => {
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

}