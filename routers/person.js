const Router = require('koa-router')
const controller = require('../controllers/index.js')
let router = new Router()
router.get('/', controller.getPerson)
module.exports = router