const jwt = require('jsonwebtoken');
const cryptoJs = require('crypto-js');
const intid = require('intid');
const model = require('../model/index');

class UsersAuth {
  static async register(ctx) {
    const req = ctx.request.body;
    if (req.account && req.password) {
      const user = await model.usersAuth.findOne({
        where: {
          account: req.account
        }
      });
      if (user) {
        ctx.body = {
          code: 901,
          message: '账号已存在',
          data: null
        };
      } else {
        const bytes = cryptoJs.AES.decrypt(req.password, 'tree-hole');
        const info = await model.users.create({
          userid: intid(10)
        });
        const auth = await model.usersAuth.create({
          userid: info.userid,
          account: req.account,
          password: bytes.toString(cryptoJs.enc.Utf8)
        });
        if (auth) {
          ctx.body = {
            code: 200,
            message: '账号注册成功',
            data: null
          };
        } else {
          await model.users.destroy({
            where: {
              id: info.id
            }
          })
          ctx.body = {
            code: 902,
            message: '账号注册失败',
            data: null
          };
        }
      }
    } else {
      ctx.body = {
        code: 900,
        message: '缺少必要参数',
        data: null
      };
    }
  }

  static async login(ctx) {
    const req = ctx.request.body;
    if (req.account && req.password) {
      const bytes = cryptoJs.AES.decrypt(req.password, 'tree-hole');
      const res = await model.usersAuth.findOne({
        where: {
          account: req.account,
          password: bytes.toString(cryptoJs.enc.Utf8)
        }
      });
      if (res) {
        const token = jwt.sign({
          account: res.account,
          password: res.password
        }, 'tree-hole', {
          expiresIn: '7d'
        });
        ctx.body = {
          code: 200,
          message: '登录成功',
          data: {
            token,
            userid: res.userid
          }
        };
      } else {
        ctx.body = {
          code: 500,
          message: '账号或密码错误',
          data: null
        };
      }
    } else {
      ctx.body = {
        code: 500,
        message: '缺少必要参数',
        data: null
      };
    }
  }
};

module.exports = UsersAuth;