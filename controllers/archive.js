const model = require('../app/model');
const Article = model.article;
const sequelize = require('../app/db')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
class ArchiveController {
    //归档查询
    static async getArchives(ctx) {
        let page = +(ctx.request.query.page || 1);
        let pageSize = +(ctx.request.query.pageSize || 10);
        let start = (page - 1) * pageSize;
        const data = await Article.findAll({
            attributes: ['id', 'title', 'updatedAt', 'createdAt'],
            order: [
                ['updatedAt', 'DESC'],
            ],
            offset: start,
            limit: pageSize
        })
        const count = await Article.findOne({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            where: {
                deletedAt: null
            }
        })
        ctx.body = {
            code: 0,
            data,
            ...count.dataValues
        }
    }
}
module.exports = ArchiveController;