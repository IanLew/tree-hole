const config = {
  development: {
    username: 'root',
    password: '1qaz2wsx3edc',
    database: 'tree_hole',
    host: 'localhost',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: '1qaz2wsx3edc',
    database: 'tree_hole',
    host: 'localhost',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: '1qaz2wsx3edc',
    database: 'tree_hole',
    host: 'localhost',
    dialect: 'mysql'
  }
};

module.exports = config[process.env.NODE_ENV];