// 放置控制器

// 文章处理
const {
    getAllArticle,
    getArticleDetail,
    subArticle,
    editArticle
} = require('./article.js')
// 归档处理
const {
    getArchive
} = require('./archive.js')
// 标签处理
const {
    getTag,
    getTagArticle
} = require('./tag')
// 留言板处理
const {
    getBoardComment,
    subComment
} = require('./comment')
// 编辑个人资料处理
const {
    getPerson,
    editPerson,
    editAvatar
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
    editPerson,
    editAvatar,

    getBoardComment,
    subComment
}