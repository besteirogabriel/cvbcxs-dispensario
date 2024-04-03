const express = require('express');
const router = express.Router();
const lojas = require('../mocks/lojas');
const pedidos = require('../mocks/pedidos');
const estoque = require('../mocks/estoque');

router.get('/', function (req, res, next) {
  res.render('pedido-acompanhar', {
    title: 'Acompanhar Pedido - CVBCXS dispensário',
    page: 'pedidos',
    system: true,
    data: {
      lojas: req.lojas,
      estoque: req.estoque,
      pedidos: req.pedidos,
    },
  });
});

module.exports = router;
