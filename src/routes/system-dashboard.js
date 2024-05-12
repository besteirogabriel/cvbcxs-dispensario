const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { fetchOrdersData } = require('../queries/selects/select-pedidos');

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
      id_pedido: 'ID Pedido',
      loja: 'Loja',
      cim: 'CIM',
      //email: 'Email',
      beneficiado: 'Beneficiado',
      medicamento: 'Medicamento',
      status: 'Status',
      buttons: 'Ações',
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

  // Se o usuário for administrador, adiciona a coluna de botões
  if (req.user.admin) {
    tableHeaders.buttons = 'Ações';
  }
  res.render('system-dashboard', {
    user: req.user,
    title: 'Dashboard - CVBCXS dispensário',
    page: 'system-dashboard',
    bodyClass: 'table',
    system: true,
    prefix: 'system',
    data: {
      isAdmin: true,
      // isAdmin: req.user.admin,
      route: 'systemDashboard',
      tableHeaders: tableHeaders,
      tableBody: pedidosAll,
      tablePageHeader: {
        title: 'Solicitações',
      },
    },
  });
});

module.exports = router;
