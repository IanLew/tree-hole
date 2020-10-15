const Router = require('koa-router');
const common = require('../controller/common');
const users = require('../controller/users');
const usersAuth = require('../controller/usersAuth');
const messages = require('../controller/messages');

const router = new Router({
  prefix: '/apis/v1'
});

router.post('/token/updateUserInfo', users.alterInfo);
router.get('/token/getUserInfo', users.getInfo);
router.post('/register', usersAuth.register);
router.post('/login', usersAuth.login);
router.post('/common/uploadFile', common.uploadFile);
router.post('/token/saveMessage', messages.saveMessage);
router.post('/token/readMessage', messages.readMessage);
router.post('/token/getInstantMessage', messages.getInstantMessage);
router.get('/token/getMessageData', messages.getMessageData);

module.exports = router;