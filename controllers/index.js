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
    getTag,
    getTagArticle
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
    getTagArticle,
    
    getArchive,
    
    getPerson,
    editPerson
}