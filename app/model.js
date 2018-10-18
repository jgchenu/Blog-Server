const fs = require('fs');
const db = require('./db');
const path = require('path')
let files = fs.readdirSync(path.resolve(__dirname, '../models'));

let js_files = files.filter((f) => {
  return f.endsWith('.js');
}, files);
let models = {}


for (let f of js_files) {
  console.log(`import model from file ${f}...`);
  let name = f.substring(0, f.length - 3);
  models[name] = require(path.resolve(__dirname, '../models') + '/'+f);
}
for (let key in models) {

  models[key].associate && models[key].associate(models);
}
models['sequelize'] = db;
module.exports = models;