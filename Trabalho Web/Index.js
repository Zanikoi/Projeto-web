const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require("path");
const bodyParser =  require('body-parser');
const Post = require("./Modules/Post");
const bcrypt = require('bcrypt');
const axios = require('axios');

//template engine
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.json());

//configuração boder parsa
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Caminhos das pastas
app.use(express.static(path.join(__dirname, '/')));

//rotas

//rota pagina inicial
app.get('/', function(req, res){
    res.sendFile(__dirname + "/Html/index.html")
});

//rota para pagina editar perfil
app.get('/Atualizar', function(req, res){
    res.sendFile(__dirname + "/Html/Pagina_Atualizar.html");
});

//rota de cadatro
app.get('/card', function(req, res){
    res.render('formulario_Cadastro');
});

//rota de cadastro
app.post('/add', function(req, res){

    Post.create({
        Nome: req.body.Nome,
        Documento: req.body.Documento,
        Cep: req.body.Cep,
        Bairro: req.body.Bairro,
        Referencia: req.body.Referencia,
        Rua: req.body.Rua,
        Numero: req.body.Numero,
        Tipo_Coleta: req.body.Tipo_Coleta,
        Email: req.body.Email,
        Senha: req.body.Senha
    }).then(function(){
        res.send("Post criado com sucesso");
    }).catch(function(erro){
        res.send("Houve um erro" + erro);
    });
});

//Rota de login
app.get('/login',function(req, res){
    res.sendFile(__dirname + "/Html/Pagina_Login.html")
});

//Rota de login
app.post('/logar', async(req, res) => {
 const user = await Post.findOne({
    attributes: ['Senha', 'Email', 'id'],
    where : {
        Email: req.body.email,
        Senha: req.body.senha
    }
 });
 
 if(user === null){
    return res.status(400).json({
        error: true,
        mensagem: "algo errado"
    });
 }
 if(!(await req.body.senha.localeCompare(Post.Senha))){
    res.send("Senha incorreta");
 }else{
    res.sendFile(__dirname + "/Html/Pagina_perfil.html");
 }
    
});
//rota de deletar
app.get('/paginadeletar',function(req, res){
    res.sendFile(__dirname + "/Html/Pagina_Deletar.html")
});

//Rota de deletar
app.post('/deletar',function(req, res){
    Post.destroy({where:{'Email': req.body.email, 'Senha': req.body.senha}}).then(function(){
        res.redirect('/');
    }).catch(function(erro){
        res.send("erro ao deletar conta");
    });
});

//rota atualizar
app.get('/paginaatualizar',function(req, res){
    res.sendFile(__dirname + "/Html/Pagina_Atualizar.html")
});
//rota atualizar
app.post('/atualizar', async(req, res)=>{

    const user = await Post.findOne({
        attributes: ['Senha', 'Email', 'id' , 'Documento', 'Cep', 'Bairro', 'Ponto_Referencia', 'Rua','Numero', 'Tipo_Coleta'],
        where : {
            Documento: req.body.Documento
        }
     }).then( async() =>{ 
        await user.update({
            where : {
            Email: req.body.Email,
            Senha: req.body.Senha,
            Cep: req.body.Cep,
            Bairro: req.body.Bairro,
            Ponto_Referencia: req.body.Ponto_Referencia,
            Rua: req.body.Rua,
            Numero: req.body.Numero,
            Tipo_Coleta: req.body.Tipo_Coleta,
        }
        });
        res.send("atualizado");

    }).catch(function(erro){
        res.send("Houve um erro" + erro);
    });

});

//rota de listagem 
app.get('/listagem', function(req, res){
   Post.findAll({order:[['id','DESC']]}).then(function(cadastros){
    console.log(cadastros);
    res.render(__dirname +'/views/Listagem', {cadastros: cadastros});
   })
});

//porta do servidor
app.listen(8081, function(){
    console.log("servidor rodando na url http://localhost:8081");
});