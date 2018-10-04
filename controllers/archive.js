const model = require('../model');
const Article = model.article;

exports.getArchive = async (ctx) => {
    const data = await Article.findAll({
        attributes: ['id', 'title', 'updatedAt', 'createdAt']
    })
    ctx.body = {
        code:200,
        data
    }
}