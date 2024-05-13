const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const { Pool } = require('pg');
const router = express.Router();
const {
  medicineData,
  basicMedicineData,
} = require('../queries/selects/select-estoque');
const jwt = require('jsonwebtoken');

const pool = new Pool({
  user: 'cvbcxs',
  host: '172.16.10.33',
  database: 'cvbcxcs_dispensario_gob',
  password: 'l_W[x1a2e~t0)',
  port: 5433, //
});

var abas = [
  {
    name: 'Editar Medicamento',
    url: 'medicamento-cadastrar',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.602 3.7c-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 3.321 0 5.97 2.117 5.97 6.167 0 3.555-1.949 6.833-2.383 7.833h-2.115c.392-1.536 2.499-4.366 2.499-7.842 0-5.153-5.867-4.985-7.369-2.458zm13.398 15.3h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2z"/></svg>',
    class: 'active',
  },
  //   {
  //     name: 'Login loja',
  //     url: 'loja-login',
  //     icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 10v-5l8 7-8 7v-5h-8v-4h8zm2-8v2h12v16h-12v2h14v-20h-14z"/></svg>',
  //   },
];

//buscar dados do medicamento

router.post('/', async (req, res) => {
  const client = await pool.connect();
  const medicamento = req.body;

  try {
    let qtd_total = null;
    if (medicamento.tipo_medicamento === 'comprimido') {
      qtd_total = medicamento.qtd_cx * medicamento.unidades_cx;
    }

    const medicamentoInsertQuery = `
      INSERT INTO MEDICAMENTOS
      (fabricacao, validade, qtd_cx, unidades_cx, composto, laboratorio, lote, medicamento, tipo_medicamento, qtd_total)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;

    const medicamentoData = [
      medicamento.fabricacao,
      medicamento.validade,
      medicamento.qtd_cx,
      medicamento.unidades_cx,
      medicamento.composto.toUpperCase(),
      medicamento.laboratorio.toUpperCase(),
      medicamento.lote.toUpperCase(),
      medicamento.medicamento.toUpperCase(),
      medicamento.tipo_medicamento.toUpperCase(),
      qtd_total,
    ];

    await client.query(medicamentoInsertQuery, medicamentoData);
    res.redirect('/estoque?cadastrado=true');
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/', async (req, res) => {
  console.log('req.body:', req.body);
  res.send('ok');
});

// make a GET that pre fills the form with the data from the selected medicine, for editing
router.get('/', async (req, res, next) => {
  console.log('req.params (/editar/id):', req.params);
  jwt.verify(req.cookies.token, req.cookies.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    } else {
      req.user = decoded;
    }
  });
  const { id } = req.params;
  try {
    const medicamento = await medicineData();
    const medicamentoSelecionado = medicamento.find(
      (medicamento) => medicamento.id === 534 //parseInt(id)
    );
    console.log('medicamentoSelecionado:', medicamentoSelecionado)
    if (medicamentoSelecionado) {
      res.render('medicamento-editar', {
        user: req.user,
        system: true,
        title: 'Editar Medicamento - CVBCXS dispensário',
        page: 'medicamento-editar',
        data: { abas: abas, medicamento: medicamentoSelecionado },
      });
    } else {
      res.status(404).json({ error: 'Medicamento não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar dados do medicamento:', error);
    res.status(500).send('Erro interno do servidor');
  }
});


module.exports = router;
