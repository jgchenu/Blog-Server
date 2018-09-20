//引入路由文件
const Router = require('koa-router')
const router = new Router();
const user = require('./routers/user')
const home = require('./routers/home')
const goods = require('./routers/goods')

//配置路由
router.use('/user', user.routes())
router.use('/home', home.routes())
router.use('/goods', goods.routes())

module.exports = router;