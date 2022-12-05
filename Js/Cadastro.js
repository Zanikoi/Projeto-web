const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require("path");
const bodyParser =  require('body-parser');
const Post = require("./Modolo/Post");
const bcrypt = require('bcrypt');
const db = require('./modolo/Db');


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
app.get('/', function(req, res){
    res.sendFile(__dirname + "/Html/index.html")
});

app.get('/card', function(req, res){
    res.render('formulario_Cadastro');
});

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

app.get('/login',function(req, res){
    res.sendFile(__dirname + "/Html/Pagina_Login.html")
});

app.post('/logar', async(req, res) => {
 const user = await Post.findOne({
    attributes: ['Senha', 'Email'],
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


app.listen(8081, function(){
    console.log("servidor rodando na url http://localhost:8081");
});