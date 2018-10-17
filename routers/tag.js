const Router = require('koa-router')
const TagController = require('../controllers/tag')
const router = new Router()

//获取所有标签以及每个标签的总数
router.get('/', TagController.getTag)
router.get('/:name', TagController.getTagArticle)
module.exports = router