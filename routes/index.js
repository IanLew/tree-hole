const Router = require('koa-router')
const LetterController = require('../controller/letter')
const LetterlogController = require('../controller/letterlog')
const CuserController = require('../controller/cuser')

const router = new Router({
  prefix: '/api'
})

router.post('/token/letter/create', LetterController.create)
router.get('/letter/list', LetterController.list)
router.get('/token/letter/mylist', LetterController.mylist)
router.get('/letter/detail/:id', LetterController.detail)
router.put('/letter/read/:id', LetterController.read)

router.post('/letterlog/create', LetterlogController.create)

router.post('/cuser/register', CuserController.create)
router.post('/cuser/login', CuserController.login)
router.get('/token/cuser/profile/:account', CuserController.profile)
router.post('/token/cuser/update', CuserController.update)
router.post('/cuser/pwd', CuserController.password)

module.exports = router
