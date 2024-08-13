const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'dispensario',
  host: 'asa1prd-db-gob01.crcsao6misme.sa-east-1.rds.amazonaws.com',
  database: 'dispensario',
  password: 'Ai.g4aex.',
  port: 5432, 
  ssl: {
    rejectUnauthorized: false,
  }, //
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await pool.connect();

    const userQuery =
      'SELECT * FROM usuarios WHERE email = $1 AND admin = true';
    const { rows } = await client.query(userQuery, [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Loja não encontrada' });
    }

    const passwordHash = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    const validPassword = passwordHash === user.senha;
    if (!validPassword) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const secretKey = crypto.randomBytes(64).toString('hex');
    const token = jwt.sign(
      {
        nome: user.nome,
        email: user.email,
        id: user.id,
        admin: user.admin,
        type: user.admin ? 1 : 2,
      },
      secretKey,
      { expiresIn: '1h' }
    );

    res.cookie('id', user.id, { httpOnly: true });
    res.cookie('secretKey', secretKey, { httpOnly: true });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');

    client.release();
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res
      .status(500)
      .json({ message: 'Erro interno ao realizar login', erro: error });
  }
});

// variáveis template
var abas = [
  {
    name: 'Login administrativo',
    url: 'admin-login',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 10v-5l8 7-8 7v-5h-8v-4h8zm2-8v2h12v16h-12v2h14v-20h-14z"/></svg>',
    class: 'active',
  },
];

//chama o template
router.get('/', function (req, res, next) {
  res.render('admin-login', {
    title: 'Login administrativo - CVBCXS dispensário',
    page: 'admin-login',
    data: { abas, abaGhost: true },
  });
});

// Login route
// router.post('/', (req, res) => {
//     const { email, password } = req.body; //pega os dados do formulário enviado
//     const admin = req.admins.find(admin => admin.email === email); //confere se o email existe na base de dados

//     if (!admin) { //se o email não existir na base de dados
//         return res.status(401).json({ message: 'Usuário não encontrado' });
//     }

//     if (!bcrypt.compareSync(password, admin.password)) { //se a senha for inválida
//         return res.status(401).json({ message: 'Senha incorreta' });
//     }
//     const secretKey = crypto.randomBytes(64).toString('hex');
//     admin.secretKey = secretKey;

//     const token = jwt.sign({ nome: admin.name, email: admin.email, id: admin.id, type: admin.admin ? 1 : 2, admin: admin.admin }, secretKey, { expiresIn: '1h' }); //gera um token com expiração de 1h

//     res.cookie('secretKey', secretKey, { httpOnly: true });
//     res.cookie('token', token, { httpOnly: true });

//     res.redirect('/dashboard'); //redireciona para o dashboard se usuário autenticado
// });

module.exports = router;
