const Router = require('koa-router')
const controller = require('../controllers/index.js')
let router = new Router()

//留言板评论查询
router.get('/board', controller.getBoardComment);
//获取文章的评论查询
router.get('/article', controller.getArticleComment)
//评论回复发布
router.post('/', controller.subComment)
module.exports = router;