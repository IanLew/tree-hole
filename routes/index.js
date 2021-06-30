const Router = require('koa-router')
const LetterController = require('../controller/letter')
const LetterlogController = require('../controller/letterlog')
const CuserController = require('../controller/cuser')

const router = new Router({
  prefix: '/api'
})

router.post('/token/letter/create', LetterController.create)
router.get('/letter/list', LetterController.list)
router.get('/letter/detail/:id', LetterController.detail)
router.put('/letter/read/:id', LetterController.read)

router.post('/letterlog/create', LetterlogController.create)

router.post('/user/register', CuserController.create)
router.post('/user/login', CuserController.login)
router.get('/token/user/profile/:account', CuserController.profile)
router.post('/token/user/update', CuserController.update)

module.exports = router
