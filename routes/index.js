const Router = require('koa-router')

const LetterController = require('../controller/website/letter')
const LetterlogController = require('../controller/website/letterlog')
const CuserController = require('../controller/website/user')

const BresourceController = require('../controller/ms/resource')
const BuserController = require('../controller/ms/user')

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
router.post('/token/letters', LetterController.getAllLetters)  // 分页获取信笺列表/回复

router.post('/letterlog/create', LetterlogController.create)  // 信笺行为记录创建
router.post('/letterlog/list', LetterlogController.list)  // 分页获取信笺行为记录
router.post('/token/letterlogs', LetterlogController.getAllLetterlogs)  // 分页获取所有信笺行为记录

router.post('/cuser/register', CuserController.create)  // 官网注册
router.post('/cuser/login', CuserController.login)  // 官网登录
router.post('/cuser/pwd', CuserController.password)  // 官网修改密码
router.get('/token/cuser/profile/:account', CuserController.profile)  // 官网获取用户信息
router.post('/token/cuser/update', CuserController.update)  // 官网更新用户信息
router.post('/token/cusers', CuserController.getUsers)  // 官网分页获取获取所有用户

router.post('/token/bresource/create', BresourceController.create)  // 后台创建资源数据
router.get('/token/bresource', BresourceController.getBresource)  // 后台获取资源数据
router.post('/token/bresource/update', BresourceController.updateBresource)  // 后台更新资源数据

router.get('/token/authority/:account', BuserController.getAuthority)  // 后台获取用户权限数据
router.post('/token/authority/update', BuserController.updateAuthority)  // 后台更新用户权限数据

router.post('/buser/login', BuserController.login)  // 后台登录
router.post('/token/buser/register', BuserController.create)  // 后台创建用户
router.get('/token/buser/profile/:account', BuserController.profile)  // 后台获取用户信息
router.post('/token/buser/update', BuserController.update)  // 后台更新用户信息
router.post('/token/busers', BuserController.getUsers)  // 后台分页获取获取所有用户

module.exports = router
