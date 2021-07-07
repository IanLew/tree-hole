const Koa = require('koa')
const body = require('koa-body')
const morgan = require('koa-morgan')
const static = require('koa-static')
const cors = require('@koa/cors')
const jwt = require('koa-jwt')
const path = require('path')

const router = require('./routes')

const app = new Koa()

app.use(body({
  multipart: true,
  formidable: {
    maxFileSize: 1 * 1024 * 1024
  }
}))
app.use(morgan('dev'))
app.use(static(path.join(__dirname, './uploads')))
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
