//引入路由文件
const Router = require('koa-router')
const router = new Router();
const user = require('./routers/user')
const article = require('./routers/article')
//配置路由
router.use('/user', user.routes())
router.use('/article', article.routes())
module.exports = router;