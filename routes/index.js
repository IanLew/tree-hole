const Router = require('koa-router')

const LetterController = require('../controller/letter')
const LetterlogController = require('../controller/letterlog')
const CuserController = require('../controller/cuser')

const BuserController = require('../controller/Buser')

const Upload = require('../common/upload')

const router = new Router({
  prefix: '/api'
})

router.post('/token/upload/image', Upload.singleImage)  // 上传图片

router.post('/token/letter/create', LetterController.create)  // 创建信笺/回复
router.post('/letter/list', LetterController.list)  // 分页获取信笺列表/回复
router.post('/token/letter/mylist', LetterController.mylist)  // 分页获取我的信笺列表/回复
router.get('/letter/detail/:id', LetterController.detail)  // 获取信笺详情
router.put('/letter/read/:id', LetterController.read)  // 更新信笺阅读状态

router.post('/letterlog/create', LetterlogController.create)  // 信笺行为记录创建
router.post('/letterlog/list', LetterlogController.list)  // 分页获取信笺行为记录

router.post('/cuser/register', CuserController.create)  // 官网注册
router.post('/cuser/login', CuserController.login)  // 官网登录
router.get('/token/cuser/profile/:account', CuserController.profile)  // 官网获取用户信息
router.post('/token/cuser/update', CuserController.update)  // 官网更新用户信息
router.post('/cuser/pwd', CuserController.password)  // 官网修改密码

router.post('/token/buser/register', BuserController.create)  // 后台注册
router.post('/buser/login', BuserController.login)  // 后台登录
router.get('/token/buser/profile/:account', BuserController.profile)  // 后台获取用户信息
router.post('/token/buser/update', BuserController.update)  // 后台更新用户信息
router.post('/buser/pwd', BuserController.password)  // 后台修改密码

module.exports = router
