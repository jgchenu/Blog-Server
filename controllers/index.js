// 放置控制器
const {
    getAllArticle,
    getArticleDetail,
    subArticle,
} = require('./article.js')
const {
    getArchive
} = require('./archive.js')
const {
    getTag
} = require('./tag')
const {
    getPerson
} = require('./person')
module.exports = {
    getAllArticle,
    getArticleDetail,
    subArticle,
    getTag,
    getArchive,
    getPerson
}