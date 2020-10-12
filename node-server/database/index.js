const { Sequelize } = require('sequelize');
const debug = require('debug')('koa-generator:server');
const config = require('./config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+08:00',
  logging: msg => debug(msg)
});

// 数据库连接测试
// sequelize.authenticate().then(() => {
//   console.log('Connection has been established successfully.')
//   process.exit()
// }).catch(err => {
//   console.error('Unable to connect to the database.', err)
// });

module.exports = sequelize;