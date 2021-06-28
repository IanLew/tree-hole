const Router = require('koa-router')
const LetterController = require('../controller/letter')
const LetterlogController = require('../controller/letterlog')

const router = new Router({
  prefix: '/api'
})

router.post('/letter/create', LetterController.create)
router.get('/letter/detail/:id', LetterController.detail)
router.get('/letter/list', LetterController.list)
router.put('/letter/read/:id', LetterController.read)

router.post('/letterlog/create', LetterlogController.create)
router.get('/letterlog/total/:letterid', LetterlogController.total)

module.exports = router
