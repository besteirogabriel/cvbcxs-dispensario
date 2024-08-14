const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const crypto = require('crypto');
const router = express.Router();

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

// variáveis template
var abas = [
  // {
  //   name: 'Cadastrar loja',
  //   url: 'loja-cadastrar',
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.602 3.7c-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 3.321 0 5.97 2.117 5.97 6.167 0 3.555-1.949 6.833-2.383 7.833h-2.115c.392-1.536 2.499-4.366 2.499-7.842 0-5.153-5.867-4.985-7.369-2.458zm13.398 15.3h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2z"/></svg>',
  // },
  {
    name: 'Login loja',
    url: 'loja-login',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 10v-5l8 7-8 7v-5h-8v-4h8zm2-8v2h12v16h-12v2h14v-20h-14z"/></svg>',
    class: 'active',
  },
];

//chama o template
router.get('/', function (req, res, next) {
  //verifica se já está logado e redireciona para o dashboard
  if (req.cookies.token && req.cookies.secretKey) {
    return res.redirect('/dashboard');
  }

  res.render('loja-login', {
    title: 'Login lojas - CVBCXS dispensário',
    page: 'loja-login',
    data: { abas },
  });
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await pool.connect();

    const userQuery =
      'SELECT * FROM usuarios WHERE email = $1 AND role =  \'LOJA\'';
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
      { nome: user.nome, email: user.email, id: user.id, role: user.role },
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

module.exports = router;
