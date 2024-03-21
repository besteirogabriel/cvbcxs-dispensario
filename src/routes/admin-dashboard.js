const express = require('express');
const router = express.Router();

const pedidos = require('../mocks/pedidos');

var tableHeaders = {
  cim: 'CIM',
  beneficiado: 'Beneficiado',
  medicamento: 'Medicamento',
  status: 'Status',
};

var pedidosGeral = pedidos.getPedidos();

router.get('/', function (req, res, next) {
  res.render('admin-dashboard', {
    title: 'Admin Dashboard  - CVBCXS dispensário',
    page: 'admin-dashboard',
    bodyClass: 'table',
    system: true,
    prefix: 'admin',
    data: {
      tableHeaders: tableHeaders,
      tableBody: pedidosGeral.data,
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