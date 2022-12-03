const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require("path");
const bodyParser =  require('body-parser');
const Post = require("./Modolo/Post");

//template engine
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//configuração boder parsa
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Public 
app.use(express.static(path.join(__dirname,"layouts")));

//rotas
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

app.listen(8081, function(){
    console.log("servidor rodando na url http://localhost:8081");
});