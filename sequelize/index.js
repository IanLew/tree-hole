const Sequelize = require('Sequelize')
const config = require('./config')
const debug = require('debug')('database')

const sequelize = new Sequelize({
	...config.dev,
	logging: msg => debug(msg)
})
sequelize.sync({ force: false })

// 测试连接
sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.')
}).catch(err => {
	console.error('Unable to connect to the database: ', err)
})

module.exports = sequelize
