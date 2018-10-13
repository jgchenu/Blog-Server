const model = require('../model');
const Article = model.article;
const sequelize=require('./../db')
//归档查询
exports.getArchive = async (ctx) => {
    let page = parseInt(ctx.request.query.page || 1);
    let pageSize = parseInt(ctx.request.query.pageSize || 10);
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
    })
    ctx.body = {
        code: 200,
        data,
        ...count.dataValues
    }
}