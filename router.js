//引入路由文件
const Router = require('koa-router')
const router = new Router();
const user = require('./routers/user')
const article = require('./routers/article')
const tag = require('./routers/tag')
const archive=require('./routers/archive')
const person=require('./routers/person')

//配置路由
router.use('/user', user.routes())
router.use('/article', article.routes())
router.use('/tag', tag.routes())
router.use('/archive', archive.routes())
router.use('/person', person.routes())

module.exports = router;