//引入路由文件
const Router = require('koa-router')
const router = new Router();
const user = require('./routers/user')
const article = require('./routers/article')
const tag = require('./routers/tag')
//配置路由
router.use('/user', user.routes())
router.use('/article', article.routes())
router.use('/tag', tag.routes())
module.exports = router;