const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

// Configuração do motor de template Handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layout',
  partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

// Arquivos estáticos
app.use(express.static('public'));

// Rotas
app.get('/', (req, res) => {
  res.render('home', { title: 'CVBCXS Dispensário' });
});

app.listen(port, () => {
  console.log(`Aplicativo rodando em http://localhost:${port}`);
});
