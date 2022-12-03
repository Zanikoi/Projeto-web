const Sequelize = require('sequelize');

//conexão com bancos de dados
const sequelize = new Sequelize('pointcollet', 'root', 'adam1234', {
    host: "localhost",
    dialect: 'mysql'
});

module.exports = { 
    Sequelize: Sequelize,
    sequelize: sequelize
}