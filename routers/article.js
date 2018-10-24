const Router = require('koa-router')
const ArticleController = require('../controllers/article.js')
let router = new Router()
//文章列表获取
router.get('/', ArticleController.getAllArticle)
//文章详情获取
router.get('/:id', ArticleController.getArticleDetail)
//文章发布
router.post('/', ArticleController.subArticle)
//文章修改
router.put('/:id', ArticleController.editArticle)
//文章删除
router.delete('/:id', ArticleController.deleteArticle)
//文章上传图片
router.post('/upload',ArticleController.uploadImage)
module.exports = router;