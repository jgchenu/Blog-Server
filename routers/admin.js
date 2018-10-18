const Router = require('koa-router')
const AdminController = require('../controllers/admin.js')

let router = new Router()
//获取个人信息
router.get('/', AdminController.getAdminInfo)
//编辑个人信息
router.put('/', AdminController.editAdminInfo)


module.exports = router