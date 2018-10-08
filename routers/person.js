const Router = require('koa-router')
const controller = require('../controllers/index.js')

let router = new Router()
router.get('/', controller.getPerson)
router.put('/', controller.editPerson)
router.post('/editAvatar',  controller.editAvatar)

module.exports = router