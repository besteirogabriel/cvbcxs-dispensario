var express = require('express');
const bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var path = require('path');

// MOCKS
const lojas = require('./mocks/lojas');
const admins = require('./mocks/admins');

// Routes
var verifyToken = require('./routes/authMiddleware');
var routes = require('./routes/home');
  //loja
var lojaLogin = require('./routes/loja-login');
var lojaCadastrar = require('./routes/loja-cadastrar');
  //administrativo
var adminLogin = require('./routes/admin-login');

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
  partialsDir: __dirname + '/views/components'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Static files
app.use(express.static('public'));

//routes init
app.use('/', routes);
  //lojas
app.use('/loja-login', (req, res, next) => { req.lojas = lojas; next(); }, lojaLogin);
app.use('/loja-cadastrar', lojaCadastrar);
  //admin
app.use('/admin-login', (req, res, next) => { req.admins = admins; next(); }, adminLogin);


//rota protegida - verifica a autenticação do login
app.get('/protected-route', verifyToken, (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Aplicativo rodando em http://localhost:${port}`);
});

