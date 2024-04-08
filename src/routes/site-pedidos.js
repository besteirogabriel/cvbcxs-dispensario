const express = require('express');
const router = express.Router();
// const lojas = require('../mocks/lojas');
const {
  checkAvailability,
  insertPedido,
} = require('../queries/inserts/insert-pedidos');
const jwt = require('jsonwebtoken');
const formatLojasData = require('../queries/selects/select-lojas');

const { Pool } = require('pg');

// Connection pool configuration
const pool = new Pool({
  user: 'cvbcxs',
  host: '172.16.10.33',
  database: 'cvbcxcs_dispensario_gob',
  password: 'l_W[x1a2e~t0)',
  port: 5433, //
});

// variáveis template
var abas = [
  {
    name: 'Solicitar',
    url: 'pedidos',
    icon: '<svg width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 3.998c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-16.5.5h15v15h-15zm6.75 6.752h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg>',
    class: 'active',
  },
  {
    name: 'Acompanhar pedido',
    url: 'pedido-acompanhar',
    icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M5 11v1h8v-7h-10v-1c0-.552.448-1 1-1h10c.552 0 1 .448 1 1v2h4.667c1.117 0 1.6.576 1.936 1.107.594.94 1.536 2.432 2.109 3.378.188.312.288.67.288 1.035v4.48c0 1.089-.743 2-2 2h-1c0 1.656-1.344 3-3 3s-3-1.344-3-3h-4c0 1.656-1.344 3-3 3s-3-1.344-3-3h-1c-.552 0-1-.448-1-1v-6h-2v-2h7v2h-3zm3 5.8c.662 0 1.2.538 1.2 1.2 0 .662-.538 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2zm10 0c.662 0 1.2.538 1.2 1.2 0 .662-.538 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2zm-3-2.8h-10v2h.765c.549-.614 1.347-1 2.235-1 .888 0 1.686.386 2.235 1h5.53c.549-.614 1.347-1 2.235-1 .888 0 1.686.386 2.235 1h1.765v-4.575l-1.711-2.929c-.179-.307-.508-.496-.863-.496h-4.426v6zm1-5v3h5l-1.427-2.496c-.178-.312-.509-.504-.868-.504h-2.705zm-16-3h8v2h-8v-2z"/></svg>',
  },
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
  res.render('site-pedidos', {
    user: req.user,
    title: 'Pedidos - CVBCXS dispensário',
    page: 'pedidos',
    system: true,
    data: {
      abas: abas,
      lojas: req.lojas,
      estoque: req.estoque,
    },
  });
});

//envia a solicitação
router.post('/', async (req, res) => {
  const pedido = req.body;
  const disponibilidade = await checkAvailability(pedido);
  if (disponibilidade) {
    console.log(await insertPedido(pedido));
    res.json({ message: 'Pedido realizado com sucesso' });
  } else {
    res.status(400).json({ message: 'Medicamento não disponível' });
  }
});

//busca o endereço da loja
router.get('/buscar-endereco-loja/:id', async (req, res) => {
  const { id } = req.params;
  const lojas = await formatLojasData();
  const lojaSelecionada = lojas.find((loja) => loja.id === parseInt(id));
  if (lojaSelecionada) {
    const enderecoLoja = {
      cep: lojaSelecionada.cep,
      endereco: lojaSelecionada.endereco,
      numero: lojaSelecionada.numero_endereco,
      cidade: lojaSelecionada.cidade,
      estado: lojaSelecionada.estado,
      veneravel: lojaSelecionada.vm,
    };
    res.json(enderecoLoja);
  } else {
    res.status(404).json({ error: 'Loja não encontrada.' });
  }
});

module.exports = router;
