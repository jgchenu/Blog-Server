const Router = require('koa-router')
const UserController = require('../controllers/user')
let router = new Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/info', UserController.getInfo)
module.exports = router;