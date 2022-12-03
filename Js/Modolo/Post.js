const db = require('./Db');

const Post = db.sequelize.define('Cadastro',{

     Nome : {
        type: db.Sequelize.STRING
     },

     Documento : {
        type: db.Sequelize.STRING
     },

     Cep : {
        type: db.Sequelize.INTEGER
     },

     Bairro : {
        type: db.Sequelize.STRING
     },

     Ponto_Referencia : {
        type: db.Sequelize.STRING
     },

     Rua : {
        type: db.Sequelize.STRING
     },

     Numero : {
        type: db.Sequelize.INTEGER
     },

     Tipo_Coleta : {
        type: db.Sequelize.TEXT
     },

     Email : {
        type: db.Sequelize.STRING
     },

     Senha : {
        type: db.Sequelize.STRING
     },

});

//Post.sync({force: true});

module.exports = Post