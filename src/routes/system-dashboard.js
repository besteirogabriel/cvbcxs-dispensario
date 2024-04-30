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

//   console.log('pedidosAll', pedidosAll);
//   //renderiza a página
//   res.render('system-dashboard', {
//     user: req.user,
//     title: 'Dashboard - CVBCXS dispensário',
//     page: 'system-dashboard',
//     bodyClass: 'table',
//     system: true,
//     prefix: 'system',
//     data: {
//       tableHeaders: tableHeaders,
//       tableBody: pedidosAll,
//       tablePageHeader: {
//         title: 'Solicitações',
//       },
//     },
//   });
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');

// // Função fictícia para simular a obtenção de dados de pedidos
// function fetchOrdersData(userId, isAdmin) {
//   // Supondo que você tenha dados fictícios de pedidos
//   const pedidosAll = [
//     {
//       cim: '123',
//       beneficiado: 'João',
//       medicamento: 'Aspirina',
//       status: 'pending',
//     },
//     {
//       cim: '456',
//       beneficiado: 'Maria',
//       medicamento: 'Paracetamol',
//       status: 'Processando',
//     },
//     {
//       cim: '789',
//       beneficiado: 'José',
//       medicamento: 'Dipirona',
//       status: 'completed',
//     },
//   ];
//   return pedidosAll;
// }

// router.get('/', async function (req, res, next) {
//   jwt.verify(req.cookies.token, req.cookies.secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Token inválido' });
//     } else {
//       req.user = decoded;
//     }
//   });

//   // Simulando dados fictícios dos pedidos
//   const pedidosAll = fetchOrdersData(req.user.id, req.user.admin);

//   // Variáveis das colunas da tabela
//   var tableHeaders = {
//     cim: 'CIM',
//     beneficiado: 'Beneficiado',
//     medicamento: 'Medicamento',
//     status: 'Status',
//   };

  // Se o usuário for administrador, adiciona a coluna de botões
  if (req.user.admin) {
    console.log('Usuário é administrador');
    tableHeaders.buttons = 'Ações';
  }

  console.log('pedidosAll', pedidosAll);

  // Renderiza a página com os dados fictícios
  console.log('user: ', req.user);
  console.log('tableHeaders: ', tableHeaders);
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
