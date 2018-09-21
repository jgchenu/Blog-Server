//引入路由文件
const Router = require('koa-router')
const router = new Router();
const user = require('./routers/user')

//配置路由
router.use('/user', user.routes())

module.exports = router;