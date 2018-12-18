//引入路由 初始化实例
const Router = require('koa-router')
const router = new Router();
//引入控制器
const UserController = require('../controllers/user')
const TagController = require('../controllers/tag')
const ArticleController = require('../controllers/article.js')
const CommentController = require('../controllers/comment.js')
const AdminController = require('../controllers/admin.js')
const ArchiveController = require('../controllers/archive.js')


//配置路由

//用户注册
router.post('/user/register', UserController.register)
//用户登录
router.post('/user/login', UserController.login)
//获取用户信息
router.get('/user/info', UserController.getInfo)
//修改用户头像
router.post('/user/editAvatar', UserController.editAvatar)


//文章列表获取
router.get('/article', ArticleController.getAllArticle)
//文章详情获取
router.get('/article/:id', ArticleController.getArticleDetail)
//文章发布
router.post('/article', ArticleController.subArticle)
//文章修改
router.put('/article/:id', ArticleController.editArticle)
//文章删除
router.delete('/article/:id', ArticleController.deleteArticle)
//文章上传图片
router.post('/article/upload',ArticleController.uploadImage)


//获取所有标签以及每个标签的总数
router.get('/tag', TagController.getTag)
//根据标签的名字获取文章
router.get('/tag/:name', TagController.getTagArticle)


//归档文章查询
router.get('/archive', ArchiveController.getArchive)


//管理员获取个人信息
router.get('/admin', AdminController.getAdminInfo)
//管理员编辑个人信息
router.put('/admin/', AdminController.editAdminInfo)
//管理员管理员登录
router.post('/admin/login', AdminController.login)


//留言板评论查询
router.get('/comment/board', CommentController.getBoardComment)
//获取文章的评论查询
router.get('/comment/article', CommentController.getArticleComment)
//评论回复发布
router.post('/comment', CommentController.subComment)


module.exports = router;