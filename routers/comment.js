const Router = require('koa-router')
const controller = require('../controllers/index.js')
let router = new Router()

//留言板评论查询
router.get('/board',controller.getBoardComment);

module.exports = router;


