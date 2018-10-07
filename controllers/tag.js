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
exports.getTagArticle = async (ctx) => {
    try {
        const {
            name
        } = ctx.params;
        let page = parseInt(ctx.request.query.page || 1);
        let pageSize = parseInt(ctx.request.query.pageSize || 10);
        let start = (page - 1) * pageSize;
        const tagData = await Article.findAll({
            include: [{
                model: Content,
            }, {
                model: Tag,
                where: {
                    name
                },
            }],
            offset: start,
            limit: pageSize
        })
        const count = await Tag.findOne({
            where: {
                name
            },
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
        })
        ctx.body = {
            code: 200,
            data: tagData,
            ...count.dataValues
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            message: error
        }
    }
}