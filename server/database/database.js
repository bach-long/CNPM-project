const path = require('path');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'test.sqlite'),
    logging: console.log, // default
});

module.exports = sequelize;
