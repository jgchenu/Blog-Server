// 放置控制器
const {
    getAllArticle,
    getArticleDetail,
    subArticle,
    editArticle
} = require('./article.js')
const {
    getArchive
} = require('./archive.js')
const {
    getTag
} = require('./tag')
const {
    getPerson,
    editPerson
} = require('./person')
module.exports = {
    getAllArticle,
    getArticleDetail,
    subArticle,
    editArticle,

    getTag,
    getArchive,
    
    getPerson,
    editPerson
}