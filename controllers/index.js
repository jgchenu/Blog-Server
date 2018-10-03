// 放置控制器
const {
    getAllArticle,
    getArticleDetail,
    subArticle,
} = require('./article.js')
const {
    getTag
} = require('./tag')
module.exports = {
    getAllArticle,
    getArticleDetail,
    subArticle,
    getTag
}