const Sequelize = require('Sequelize')
const db = require('./config')

const sequelize = new Sequelize(db.dev)
sequelize.sync({ force: false })

module.exports = sequelize
