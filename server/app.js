const Koa = require('koa');
const app = new Koa();
const debug = require('debug')('koa-weapp-demo');
const response = require('./middlewares/response');
const bodyParser = require('koa-bodyparser');
const config = require('./config');



// 配置跨域
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.set('Access-Control-Max-Age', 3600 * 24);
    await next();
});

// 使用响应处理中间件
app.use(response);

// 解析请求体
app.use(bodyParser());

// 引入路由分发
const router = require('./routes');
app.use(router.routes()).use(router.allowedMethods());

// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`));
