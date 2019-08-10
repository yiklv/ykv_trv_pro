const Koa = require('koa');
const app = new Koa();
const debug = require('debug')('koa-weapp-demo');
const response = require('./middlewares/response');
const bodyKoa = require('koa-body');
const config = require('./config');
const wxpay = require('./services/wxpay/index');

const path = require('path');
const staticFiles = require('koa-static');

// 配置跨域
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.set('Access-Control-Max-Age', 3600 * 24);

    await next();
});


app.use(staticFiles(path.join(__dirname, './uploads/')));

// 使用响应处理中间件
app.use(response);
app.use(async (ctx, next) => {
    if (ctx.path === '/weapp/wxpay/updateOrderInfo' && ctx.method === 'POST') {
    	let postData = await parsePostData(ctx);
    	let res = await wxpay.updateOrderInfo(postData);
    	console.log('------------------------------------------',res);
    	ctx.body = res;
    }else{
    	await next();
    }
    function parsePostData() {
        return new Promise((resolve, reject) => {
            try {
                let postData = '';
                ctx.req.addListener('data', (data) => { // 有数据传入的时候
                    postData += data;
                });
                ctx.req.on('end', () => {
                    //let parseData = parseQueryStr(postData);
                    resolve(postData);
                });
            } catch (e) {
                reject(e);
            }
        })
    }

});
// 解析请求体
app.use(bodyKoa()); // {strict:false}

// 引入路由分发
const router = require('./routes');
app.use(router.routes()).use(router.allowedMethods());



// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`));
