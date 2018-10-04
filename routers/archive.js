const Router = require('koa-router')
const controller = require('../controllers/index.js')
let router = new Router()

//归档查询
router.get('/',controller.getArchive);

module.exports = router;
