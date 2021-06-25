const Router = require('koa-router')
const LetterController = require('../controller/letter')

const router = new Router({
  prefix: '/api'
})

router.post('/letter/create', LetterController.create)
router.post('/letter/detail/:id', LetterController.detail)

module.exports = router
