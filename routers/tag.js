const Router = require('koa-router')
const controller = require('../controllers')
const router = new Router()

//获取所有标签以及每个标签的总数
router.get('/', controller.getTag)
router.get('/:name', controller.getTagArticle)
module.exports = router