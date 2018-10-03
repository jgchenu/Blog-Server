const Router = require('koa-router')
const controller = require('../controllers/index.js')


// const Sequelize = require('sequelize')
let router = new Router()
//文章列表获取
router.get('/', controller.getAllArticle)
//文章详情获取
router.get('/:id', controller.getArticleDetail)
//文章发布
router.post('/', controller.subArticle)
module.exports = router;