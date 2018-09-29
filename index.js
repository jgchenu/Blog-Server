const Koa = require('koa');
const app = new Koa;
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const router = require('./router')
//使用body解析
app.use(bodyParser())
//跨域
app.use(cors())
//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())
//首页
app.use(async (ctx) => {
  ctx.body = `<h1>Hello world</h1>`
})
//启动服务
app.listen(8000, () => {
  console.log('listen 8000')
})