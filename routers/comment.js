const Router = require('koa-router')
const CommentController = require('../controllers/comment.js')
let router = new Router()

//留言板评论查询
router.get('/board', CommentController.getBoardComment);
//获取文章的评论查询
router.get('/article', CommentController.getArticleComment)
//评论回复发布
router.post('/', CommentController.subComment)
module.exports = router;