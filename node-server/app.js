const Koa = require('koa');
const koaJson = require('koa-json');
const koaOnerror = require('koa-onerror');
const koaBody = require('koa-body');
const koaLogger = require('koa-logger');
const koaStatic = require('koa-static');
const koaJwt = require('koa-jwt');
const router = require('./routes');

const app = new Koa();

koaOnerror(app);

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024
  }
}));
app.use(koaJson());
app.use(koaLogger());
app.use(koaStatic(`${__dirname}/assets`));

app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.body = {
        code: ctx.status,
        message: '接口不存在',
        data: null
      }
    }
  } catch (err) {
    console.log(err)
    if (err.status === 401) {
      ctx.body = {
        code: err.status,
        message: '登录失效',
        data: null
      }
    } else {
      ctx.body = {
        code: err.status,
        message: '服务器错误',
        data: null
      }
    }
  }
});

app.use(koaJwt({
  secret: 'tree-hole'
}).unless({
  path: /^((?!token).)*$/
}));

app.use(router.routes(), router.allowedMethods());

module.exports = app;