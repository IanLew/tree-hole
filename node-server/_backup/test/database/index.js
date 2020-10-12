const { Sequelize } = require('sequelize')
const config = require('./config').development

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  operatorsAliases: config.operatorsAliases,
  dialectOptions: {
    chartset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+08:00'
})

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.')
  process.exit()
}).catch(err => {
  console.error('Unable to connect to the database.', err)
})

module.exports = sequelize