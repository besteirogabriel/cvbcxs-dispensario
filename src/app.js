var express = require('express');
const bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var path = require('path');
const $ = require('jquery');
const cookieParser = require('cookie-parser'); //cookies 
const axios = require('axios'); //autocomplete CEP

// MOCKS
const lojas = require('./mocks/lojas');
const admins = require('./mocks/admins');
const estoque = require('./mocks/estoque');
const pedidos = require('./mocks/pedidos');

// Routes
var verifyToken = require('./routes/authMiddleware');
var handlebarsHelpers  = require('./routes/handlebars-helpers');
  //site
var routes = require('./routes/site-home');
var siteEstoque = require('./routes/site-estoque');
var sitePedidos = require('./routes/site-pedidos');
var sitePedidoAcompanhar = require('./routes/site-pedido-acompanhar');
  //loja
var lojaLogin = require('./routes/loja-login');
var lojaCadastrar = require('./routes/loja-cadastrar');
var lojaDashboard = require('./routes/loja-dashboard');
  //administrativo
var adminLogin = require('./routes/admin-login');
var adminDashboard = require('./routes/admin-dashboard');

var app = express();
var port = 3000;

// Configure o body-parser para analisar solicitações JSON e codificadas URL
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure Handlebars engine
app.engine('hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'index',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/components',
  helpers: handlebarsHelpers
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Static files
app.use(express.static('public'));

//configuração cookies 
app.use(cookieParser());

//routes init
app.use('/', routes);
app.use('/estoque', (req, res, next) => { req.estoque = estoque; next(); }, siteEstoque);
app.use('/pedidos', (req, res, next) => { req.lojas = lojas; req.estoque = estoque; req.pedidos = pedidos; next(); }, sitePedidos);
app.use('/pedido-acompanhar', sitePedidoAcompanhar);
  //lojas
app.use('/loja-login', (req, res, next) => { req.lojas = lojas; next(); }, lojaLogin);
app.use('/loja-cadastrar', lojaCadastrar);
app.use('/loja-dashboard', verifyToken, lojaDashboard);
  //admin
app.use('/admin-login', (req, res, next) => { req.admins = admins; next(); }, adminLogin);
app.use('/admin-dashboard', verifyToken, adminDashboard);


//rota protegida - verifica a autenticação do login
app.get('/protected-route', verifyToken, (req, res) => {
  res.sendStatus(200);
});

//busca endereço por CEP
app.get('/buscar-endereco/:cep', async (req, res) => {
  const { cep } = req.params;
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const endereco = response.data;
    res.json(endereco);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o endereço.' });
  }
});

app.listen(port, () => {
  console.log(`Aplicativo rodando em http://localhost:${port}`);
});

