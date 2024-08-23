const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const { Pool } = require('pg');
const router = express.Router();
const jwt = require('jsonwebtoken');

const pool = new Pool({
  user: 'dispensario',
  host: '172.18.0.1',
  database: 'dispensario',
  password: 'Ai.g4aex.',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  }, //
});

// variáveis template
var abas = [
  {
    name: 'Cadastrar loja',
    url: 'loja-cadastrar',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.602 3.7c-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 3.321 0 5.97 2.117 5.97 6.167 0 3.555-1.949 6.833-2.383 7.833h-2.115c.392-1.536 2.499-4.366 2.499-7.842 0-5.153-5.867-4.985-7.369-2.458zm13.398 15.3h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2z"/></svg>',
    class: 'active',
  },
  // {
  //   name: 'Login loja',
  //   url: 'loja-login',
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 10v-5l8 7-8 7v-5h-8v-4h8zm2-8v2h12v16h-12v2h14v-20h-14z"/></svg>',
  // },
];

//chama o template
router.get('/', function (req, res, next) {
  jwt.verify(req.cookies.token, req.cookies.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    } else {
      req.user = decoded;
    }
  });
  res.render('loja-cadastrar', {
    user: req.user,
    title: 'Cadastrar loja - CVBCXS dispensário',
    page: 'loja-cadastrar',
    system: true,
    prefix: 'system',
    data: {
      isAdmin: true,
      abas
    },
  });
});

router.post('/', async (req, res) => {
  try {
    const client = await pool.connect();
    var loja = req.body;

    const passwordHash = crypto
      .createHash('sha256')
      .update(loja.password)
      .digest('hex');

    //console.log('userData:', loja.email, passwordHash, loja.name, false);
    //console.log('lojaData:', loja.name, loja.numero_loja, loja.cnpj, loja.telefone, loja.vm, loja.hospitaleiro, loja.cep, loja.endereco, loja.numero, loja.complemento)

    const userInsertQuery = `
              INSERT INTO usuarios (email, senha, created_at, nome, role)
              VALUES ($1, $2, CURRENT_TIMESTAMP, $3, 'LOJA')
              RETURNING id`;
    const userData = [loja.email, passwordHash, loja.name];
    const userResult = await client.query(userInsertQuery, userData);

    const userId = userResult.rows[0].id;

    const lojaInsertQuery = `
            INSERT INTO lojas (user_id, nome_loja, numero_loja, cnpj, telefone, nome_vm, nome_hospitaleiro, cep, endereco, uf, cidade, numero, complemento, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, CURRENT_TIMESTAMP)`;
    const lojaData = [
      userId,
      loja.name,
      loja.numero_loja,
      loja.cnpj,
      loja.telefone,
      loja.vm,
      loja.hospitaleiro,
      loja.cep,
      loja.endereco,
      loja.estado,
      loja.cidade,
      loja.numero,
      loja.complemento,
    ];

    await client.query(lojaInsertQuery, lojaData);
    res.redirect('/loja-login?success=true');
  } catch (error) {
    console.error('Erro ao cadastrar loja:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao cadastrar loja. Verifique os dados enviados.',
    });
  }
});

module.exports = router;
