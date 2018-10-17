const Router = require('koa-router')
const AdminController = require('../controllers/admin.js')

let router = new Router()
//获取个人信息
router.get('/', AdminController.getPerson)
//编辑个人信息
router.put('/', AdminController.editPerson)
//更改头像
router.post('/editAvatar', AdminController.editAvatar)

module.exports = router