const Koa = require('koa')
const body = require('koa-body')
const morgan = require('koa-morgan')
const cors = require('@koa/cors')
const jwt = require('koa-jwt')

const router = require('./routes')

const app = new Koa()

app.use(body())

app.use(morgan('dev'))

app.use(cors())

app.use(async (ctx, next) => {
  try {
    await next()
    if (ctx.status === 404) {
      ctx.throw(404)
    }
  } catch(err) {
    ctx.status = err.statusCode || err.status || 500
    ctx.body = {
      code: ctx.status,
      message: err.message
    }
    ctx.app.emit('error', err, ctx)
  }
})

app.use(jwt({
  secret: 'tree-hole'
}).unless({
  path: /^((?!token).)*$/
}))

app.use(router.routes())

module.exports = app
