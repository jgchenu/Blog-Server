const model = require('../app/model');
const sequelize = require('../app/db')
const Article = model.article;
const Content = model.content;
const Tag = model.tag;
class TagController {
    static async getTags(ctx) {
        const data = await Tag.findAll({
            attributes: ['name',
                [sequelize.fn('COUNT', sequelize.col('name')), 'count']
            ],
            group: 'name'
        })
        ctx.body = {
            code: 0,
            data
        }
    }
    static async getArticlesByTag(ctx) {
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
            code: 0,
            data: tagData,
            ...count.dataValues
        }
    }
}
module.exports = TagController;