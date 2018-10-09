const Koa = require('koa');
const app = new Koa;
// const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const router = require('./router')
const path = require('path')
const koaStatic = require('koa-static')



//使用koabody解析上传文件,formdata，json数据
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
  }
}));
//使用bodyparse解析
// app.use(bodyParser())

//跨域
app.use(cors())
//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


//设置静态资源的目录
const staticPath = './static'

app.use(koaStatic(
  path.join(__dirname, staticPath)
))
//首页
app.use(async (ctx) => {
  ctx.body = `<h1>Hello world</h1>`
})
//启动服务
app.listen(8000, () => {
  console.log('listen 8000')
})