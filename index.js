const Koa = require('koa'); // web开发框架
const Router = require('koa-router')
const app = new Koa;
const koaBody = require('koa-body') // 用于查询字符串解析到`ctx.request.query`
const cors = require('koa2-cors') //跨域
const router = new Router(); // 路由中间件
const api = require('./router')
const path = require('path') // 用于处理目录路径
const koaStatic = require('koa-static') // 静态资源处理
const jwtKoa = require('koa-jwt'); // 用于路由权限控制
const errorHandle = require('./middlewares/errorHandle')
const secret = 'jgchen'
console.log(process.env.NODE_ENV)
//跨域
process.env.NODE_ENV ? app.use(cors()) : '';
//设置静态资源的目录
const staticPath = './static'
app.use(koaStatic(
  path.join(__dirname, staticPath)
))

// 使用koabody解析上传文件,formdata，json数据
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
  }
}));


/* 当token验证异常时候的处理，如token过期、token错误 */
app.use(errorHandle);

/* 路由权限控制 allowArr是允许通过方法路径正则 */
app.use(jwtKoa({
  secret: secret
}).unless({
  custom: ctx => {
    const allowArr = [{
      method: 'POST',
      urlReg: /^\/api\/user\/(register|login)/
    }, {
      method: 'GET',
      urlReg: /^\/api\/(admin|tag|article|archive|comment).*/
    }, {
      method: 'GET',
      urlReg: /^((?!\/api).)*$/
    }]
    const matchItem = allowArr.filter((item) => {
      return item.urlReg.test(ctx.request.url)
    });
    if (matchItem.length) {
      return !!~matchItem[0].method.indexOf(ctx.request.method)
    }
    return false;
  }
}));

//加载路由中间件
router.use('/api', api.routes())
app.use(router.routes())
app.use(router.allowedMethods())


//首页
app.use(async (ctx) => {
  ctx.body = `<h1>小光光最帅</h1>`
})
//启动服务
app.listen(8000, () => {
  console.log('listen 8000')
})