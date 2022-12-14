'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require(__dirname + '/../../config/database.js');
const db = {};
let sequelize;

sequelize = new Sequelize(config.database, config.username, config.password, config);
global.Op = Sequelize.Op;
sequelize
  .authenticate()
  .then(() => {
    console.log(`Connection(${config.database}) has been established successfully.`);
  })
  .catch((err) => {
    console.log(`Unable to connect to the database: ${err}`);
  });
fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
global.sequelize = sequelize;
module.exports = db;
