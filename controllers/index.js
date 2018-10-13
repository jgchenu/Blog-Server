// 放置控制器

// 文章处理
const {
    getAllArticle,
    getArticleDetail,
    subArticle,
    editArticle,
    deleteArticle
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
// 评论处理（文章评论，留言板评论）
const {
    getBoardComment,
    subComment,
    getArticleComment
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
    deleteArticle,

    getTag,
    getTagArticle,

    getArchive,

    getPerson,
    editPerson,
    editAvatar,

    getBoardComment,
    subComment,
    getArticleComment
}