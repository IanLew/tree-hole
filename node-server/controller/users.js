const model = require('../model/index');

class Users {
  static async alterInfo(ctx) {
    const req = ctx.request.body;
    if (req.userid) {
      const res = await model.users.update({
        nickname: req.nickname,
        identity: req.identity,
        avatar: req.avatar,
        gender: req.gender,
        birthday: req.birthday,
        email: req.email,
        mobile: req.mobile,
        province: req.province,
        city: req.city,
        district: req.district,
        address: req.address,
        hobby: req.hobby
      }, {
        where: {
          userid: req.userid
        }
      });
      ctx.body = {
        code: res ? 200 : 905,
        message: `用户信息修改${res ? '成功' : '失败'}`,
        data: res
      };
    } else {
      ctx.body = {
        code: 900,
        message: '缺少必要参数',
        data: null
      };
    }
  }

  static async getInfo(ctx) {
    const req = ctx.request.query;
    if (req.userid) {
      const res = await model.users.findOne({
        where: {
          userid: req.userid
        }
      });
      ctx.body = {
        code: res ? 200 : 906,
        message: `用户信息查询${res ? '成功' : '失败'}`,
        data: res
      };
    } else {
      ctx.body = {
        code: 900,
        message: '缺少必要参数',
        data: null
      };
    }
  }
};

module.exports = Users;