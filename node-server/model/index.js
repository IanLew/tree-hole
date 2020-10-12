const fs = require('fs');

const files = fs.readdirSync(__dirname);
const jsFiles = files.filter(v => v.endsWith('.js') && !v.startsWith('index'));

let models = {};

for(let v of jsFiles) {
  const name = v.replace(/\.js$/, '');
  models[name] = require(`${__dirname}/${name}`);
}

module.exports = models;