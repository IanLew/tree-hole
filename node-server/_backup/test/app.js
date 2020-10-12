const Koa = require('koa');
const koaJson = require('koa-json');
const koaOnerror = require('koa-onerror');
const koaBody = require('koa-body');
const koaLogger = require('koa-logger');
const koaStatic = require('koa-static');
const router = require('./routes');

const app = new Koa();

koaOnerror(app);

app.use(koaBody());
app.use(koaJson());
app.use(koaLogger());
app.use(koaStatic(`${__dirname}/assets`));

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(router.routes(), router.allowedMethods());

module.exports = app;