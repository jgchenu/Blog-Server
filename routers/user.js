const Router = require('koa-router')
const UserController = require('../controllers/user')
let router = new Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/info', UserController.getInfo)
//更改头像
router.post('/editAvatar', UserController.editAvatar)

module.exports = router;