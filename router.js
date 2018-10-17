//引入路由文件
const Router = require('koa-router')
const router = new Router();
const user = require('./routers/user')
const article = require('./routers/article')
const tag = require('./routers/tag')
const archive = require('./routers/archive')
const admin = require('./routers/admin')
const comment = require('./routers/comment')
//配置路由
router.use('/user', user.routes())
router.use('/article', article.routes())
router.use('/tag', tag.routes())
router.use('/archive', archive.routes())
router.use('/admin', admin.routes())
router.use('/comment', comment.routes())



module.exports = router;