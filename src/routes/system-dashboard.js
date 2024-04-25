const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
// const pedidos = require('../mocks/pedidos');
const { fetchOrdersData } = require('../queries/selects/select-pedidos');

// variaveis template
var tableHeaders = {
  cim: 'CIM',
  //email: 'Email',
  beneficiado: 'Beneficiado',
  medicamento: 'Medicamento',
  status: 'Status',
};

router.get('/', async function (req, res, next) {
  jwt.verify(req.cookies.token, req.cookies.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    } else {
      req.user = decoded;
    }
  });
  //  var pedidosAll = pedidos.getPedidos({ id: req.user.id, type: req.user.type });
  const pedidosAll = await fetchOrdersData(req.user.id, req.user.admin);

  var tableHeaders = {};
  if (req.user.admin) {
    tableHeaders = {
      loja: 'Loja',
      cim: 'CIM',
      //email: 'Email',
      beneficiado: 'Beneficiado',
      medicamento: 'Medicamento',
      status: 'Status',
    };
  } else {
    tableHeaders = {
      cim: 'CIM',
      //email: 'Email',
      beneficiado: 'Beneficiado',
      medicamento: 'Medicamento',
      status: 'Status',
    };
  }

  console.log('pedidosAll', pedidosAll);
  //renderiza a página
  res.render('system-dashboard', {
    user: req.user,
    title: 'Dashboard - CVBCXS dispensário',
    page: 'system-dashboard',
    bodyClass: 'table',
    system: true,
    prefix: 'system',
    data: {
      tableHeaders: tableHeaders,
      tableBody: pedidosAll,
      tablePageHeader: {
        title: 'Solicitações',
      },
    },
  });
});

module.exports = router;
