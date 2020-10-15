const { Sequelize, Op } = require('sequelize');
const model = require('../model/index');

class Users {
  static async saveMessage(ctx) {
    const req = ctx.request.body;
    if (req.from && req.to && req.transparency) {
      try {
        await model.messages.create(req)
        ctx.body = {
          code: 200,
          message: '发送成功',
          data: null
        };
      } catch {
        ctx.body = {
          code: 908,
          message: '发送失败',
          data: null
        };
      }
    } else {
      ctx.body = {
        code: 908,
        message: '缺少必要参数',
        data: null
      };
    }
  }

  static async readMessage(ctx) {
    const req = ctx.request.body;
    if (req.id || (req.from && req.to)) {
      try {
        await model.messages.update({
          isread: 1
        }, {
          where: req.id ? {
            id: req.id
          } : {
            from: req.from,
            to: req.to
          }
        })
        ctx.body = {
          code: 200,
          message: '已阅读',
          data: null
        };
      } catch {
        ctx.body = {
          code: 908,
          message: '阅读失败',
          data: null
        };
      }
    } else {
      ctx.body = {
        code: 908,
        message: '缺少必要参数',
        data: null
      };
    }
  }

  static async getInstantMessage(ctx) {
    const req = ctx.request.body;
    const limit = req.limit || 10;
    const page = req.page || 1;
    const offset = (page - 1) * limit;
    if (req.from && req.to && req.transparency) {
      try {
        const res = await model.messages.findAndCountAll({
          where: {
            from: req.from,
            to: req.to,
            transparency: req.transparency
          },
          order: [
            ['createdAt', 'DESC']
          ],
          offset,
          limit
        });
        ctx.body = {
          code: 200,
          message: '获取消息成功',
          data: res
        };
      } catch {
        ctx.body = {
          code: 908,
          message: '获取消息失败',
          data: res
        };
      }
    } else {
      ctx.body = {
        code: 908,
        message: '缺少必要参数',
        data: null
      };
    }
  }

  static async getMessageData(ctx) {
    const req = ctx.request.query;
    if (req.userid) {
      const res = await model.messages.findAll({
        where: {
          [Op.or]: [
            { from: req.userid },
            { to: req.userid }
          ],

        },
        order: [
          ['createdAt', 'DESC']
        ],
        attributes: [
          'from', 'to', 'transparency', 'content', 'createdAt',
          [Sequelize.fn('COUNT', '*'), 'count']
        ],
        group: ['from', 'to']
      })
      ctx.body = {
        code: 200,
        message: '获取消息数据成功',
        data: res
      };
    } else {
      ctx.body = {
        code: 908,
        message: '缺少必要参数',
        data: null
      };
    }
  }
}

module.exports = Users;