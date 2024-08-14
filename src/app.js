var express = require('express');
const bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var path = require('path');
const $ = require('jquery');
const cookieParser = require('cookie-parser'); // cookies 
const axios = require('axios'); // autocomplete CEP

// SSL Certificate setup
const https = require('https');
const fs = require('fs');

// SSL options with paths to your certificate files
const options = {
  key: fs.readFileSync('./certbot/privkey.pem'),
  cert: fs.readFileSync('./certbot/fullchain.pem')
};

// Initialize the express app
var app = express();
var port = 443; // HTTPS port

// Configure body-parser for JSON and URL encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define custom helpers
var hbsHelpers = {
  eq: function (a, b) {
    return a == b;
  },
  or: function () {
    const args = Array.from(arguments);
    args.pop(); // Remove the last argument (Handlebars options object)
    return args.some(Boolean);
  }
  // Add more helpers here as needed
};

// Configure Handlebars engine
app.engine('hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'index',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/components',
  helpers: hbsHelpers  // Pass the helpers here
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Configure cookies
app.use(cookieParser());

// Define routes
var verifyToken = require('./routes/authMiddleware');
var routes = require('./routes/site-home');
var siteEstoque = require('./routes/site-estoque');
var sitePedidos = require('./routes/site-pedidos');
var sitePedidoAcompanhar = require('./routes/site-pedido-acompanhar');

// loja routes
var lojaLogin = require('./routes/loja-login');
var lojaCadastrar = require('./routes/loja-cadastrar');

// administrativo routes
var adminLogin = require('./routes/admin-login');
var medicamentoCadastrar = require('./routes/medicamento-cadastrar');
var medicamentoEditar = require('./routes/medicamento-editar');

// system routes
var dashboard = require('./routes/system-dashboard');

// Register routes with app
app.use('/', routes);
app.use('/estoque', (req, res, next) => { req.estoque = estoque; next(); }, siteEstoque);
app.use('/estoque-admin', verifyToken, async (req, res, next) => {
  try {
    req.estoque = estoque;
    req.system = true;
    next();
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
}, siteEstoque);

app.use('/pedidos', verifyToken, async (req, res, next) => {
  try {
    const idDoCookie = req?.cookies?.id || null;
    req.lojas = await formatLojasData(idDoCookie);
    req.estoque = await basicMedicineData();
    req.pedidos = pedidos;
    next();
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
}, sitePedidos);

app.use('/pedido-acompanhar', sitePedidoAcompanhar);

// loja routes
app.use('/loja-login', (req, res, next) => { req.lojas = lojas; next(); }, lojaLogin);
app.use('/loja-cadastrar', lojaCadastrar);

// admin routes
app.use('/admin-login', (req, res, next) => { req.admins = admins; next(); }, adminLogin);

// system routes
app.use(
  '/dashboard',
  verifyToken,
  (req, res, next) => {
    req.token = req.cookies.token;
    req.secretKey = req.cookies.secretKey;
    next();
  },
  dashboard
);

// Medicamento routes
app.use('/medicamento-cadastrar',
  async (req, res, next) => {
    try {
      req.estoque = await basicMedicineData();
      next();
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
    }
  }, medicamentoCadastrar);

app.use('/medicamento-editar',
  async (req, res, next) => {
    try {
      req.estoque = await basicMedicineData();
      next();
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
    }
  }, medicamentoEditar);

// Protected route example
app.get('/protected-route', verifyToken, (req, res) => {
  res.sendStatus(200);
});

// CEP lookup route
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

// Logout route
app.get('/logout', (req, res) => {
  res.clearCookie('id');
  res.clearCookie('token');
  res.clearCookie('secretKey');
  res.redirect('/');
});

// Start the HTTPS server
https.createServer(options, app).listen(port, () => {
  console.log(`Servidor HTTPS rodando na porta ${port}`);
});
