const Router = require('koa-router')
const ArchiveController = require('../controllers/archive.js')
let router = new Router()

//归档查询
router.get('/', ArchiveController.getArchive);

module.exports = router;