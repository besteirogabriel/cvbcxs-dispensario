const express = require('express');
const router = express.Router();

const pedidos = require('../mocks/pedidos');

// variaveis template
var tableHeaders = {
    cim: 'CIM',
    email: 'Email',
    beneficiado: 'Beneficiado',
    medicamento: 'Medicamento',
    status: 'Status',
};


//chama o template
router.get('/', function (req, res, next) {
  res.render('loja-dashboard', {
    title: 'Loja Dashboard - CVBCXS dispensário',
    page: 'loja-dashboard',
    bodyClass: 'table',
    system: true,
    prefix: 'loja',
    data: {
      tableHeaders: tableHeaders,
      tableBody: pedidosLoja.data,
      tablePageHeader: {
        title: 'Solicitações',
        tableActions: {
          search: {
            placeholder: 'Pesquisar solicitações',
          },
        },
      },
    },
  });
});

module.exports = router;
