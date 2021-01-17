const Sequelize = require('sequelize');
const connection = new Sequelize('pressguide', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;