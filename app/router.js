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
router.post('/userRegister', UserController.register)
//用户登录
router.post('/userLogin', UserController.login)
//获取用户信息
router.get('/userInfo', UserController.getInfo)
//修改用户头像
router.post('/editAvatar', UserController.editAvatar)


//文章列表获取
router.get('/articles', ArticleController.getAllArticle)
//文章详情获取
router.get('/articles/:id', ArticleController.getArticleById)
//文章发布
router.post('/articles', ArticleController.subArticle)
//文章修改
router.put('/articles/:id', ArticleController.editArticle)
//文章删除
router.delete('/articles/:id', ArticleController.deleteArticle)
//文章上传图片
router.post('/uploadArticleImage',ArticleController.uploadImage)


//获取所有标签以及每个标签的总数
router.get('/tags', TagController.getTags)
//根据标签的名字获取文章
router.get('/tags/:name/articles', TagController.getArticlesByTag)


//归档文章查询
router.get('/archives', ArchiveController.getArchives)


//管理员获取个人信息
router.get('/adminInfo', AdminController.getAdminInfo)
//管理员编辑个人信息
router.put('/adminInfo', AdminController.editAdminInfo)
//管理员管登录
router.post('/adminLogin', AdminController.login)

//留言板评论查询
router.get('/board/comments', CommentController.getBoardComments)
//获取对管理员的评论以及对应的文章查询
router.get('/comments/articles', CommentController.getCommentsLinkArticles)
//评论发布
router.post('/comments', CommentController.subComment)


module.exports = router;