const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pedidos = require('../mocks/pedidos');

// variaveis template
var tableHeaders = {
  cim: 'CIM',
  email: 'Email',
  beneficiado: 'Beneficiado',
  medicamento: 'Medicamento',
  status: 'Status',
};

router.get('/', function (req, res, next) {
  jwt.verify(req.cookies.token, req.cookies.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    } else {
      req.user = decoded;
    }
  });

  //busca os pedidos
  var pedidosAll = pedidos.getPedidos({ id: req.user.id, type: req.user.type });
  // var pedidosAll = pedidos.getPedidos({ id: 1, type: 2});

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
      tableBody: pedidosAll.data,
      tablePageHeader: {
        title: 'Solicitações',
      },
    },
  });
});

module.exports = router;
