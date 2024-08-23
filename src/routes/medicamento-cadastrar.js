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
  user: 'dispensario',
  host: '172.18.0.1',
  database: 'dispensario',
  password: 'Ai.g4aex.',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

var abas = [
  {
    name: 'Cadastrar Medicamento',
    url: 'medicamento-cadastrar',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.602 3.7c-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 3.321 0 5.97 2.117 5.97 6.167 0 3.555-1.949 6.833-2.383 7.833h-2.115c.392-1.536 2.499-4.366 2.499-7.842 0-5.153-5.867-4.985-7.369-2.458zm13.398 15.3h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2z"/></svg>',
    class: 'active',
  },
];

router.get('/medicamento-cadastrar/:id', async (req, res) => {
  const { id } = req.params;
  console.log('cadastrar/id:', id);
  const medicamento = await basicMedicineData();
  const medicamentoSelecionado = medicamento.find(
    (medicamento) => medicamento.id === parseInt(id)
  );
  if (medicamentoSelecionado) {
    const medicamento = {
      composto: medicamentoSelecionado.composto,
      gramatura: medicamentoSelecionado.gramatura,
      laboratorio: medicamentoSelecionado.laboratorio,
      unidades_cx: medicamentoSelecionado.unidades_cx,
    };
    res.json(medicamento);
  } else {
    res.status(404).json({ error: 'Medicamento não encontrado.' });
  }
});

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
      medicamento.compostos.toUpperCase(), // Compostos concatenados com +
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
  } finally {
    client.release();
  }
});

router.get('/', function (req, res, next) {
  jwt.verify(req.cookies.token, req.cookies.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    } else {
      req.user = decoded;
    }
  });
  res.render('medicamento-cadastrar', {
    user: req.user,
    system: true,
    title: 'Cadastrar Medicamento - CVBCXS dispensário',
    page: 'medicamento-cadastrar',
    data: { abas: abas, estoque: req.estoque },
  });
});

router.post('/', async (req, res) => {
  console.log('req.body:', req.body);
  res.send('ok');
});

router.get('/:id', async (req, res, next) => {
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
      (medicamento) => medicamento.id === parseInt(id)
    );
    console.log('medicamentoSelecionado:', medicamentoSelecionado);
    if (medicamentoSelecionado) {
      console.log('if');
      res.render('medicamento-cadastrar', {
        user: req.user,
        system: true,
        title: 'Editar Medicamento - CVBCXS dispensário',
        page: 'medicamento-cadastrar',
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
