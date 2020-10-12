const Sequelize = require("sequelize");

module.exports = { 
  development: {
    "username": "root",
    "password": "nodejsbook",
    "database": "react-nodebird",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": Sequelize.Op,
  },  
  test: {
    "username": "root",
    "password": "nodejsbook",
    "database": "react-nodebird",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": Sequelize.Op,
  },  
  production: {
    "username": "root",
    "password": "nodejsbook",
    "database": "react-nodebird",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": Sequelize.Op,
  }
}