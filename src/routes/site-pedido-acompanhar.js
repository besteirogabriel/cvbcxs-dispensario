const express = require('express');
const router = express.Router();
const { fetchOrdersData } = require('../queries/selects/select-pedidos');

// variaveis template
var tableHeaders = {
  cim: 'CIM',
  //email: 'Email',
  beneficiado: 'Beneficiado',
  medicamento: 'Medicamento',
  status: 'Status',
};

// variáveis template
var abas = [
  {
    name: 'Solicitar',
    url: 'pedidos',
    icon: '<svg width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 3.998c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-16.5.5h15v15h-15zm6.75 6.752h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg>',
  },
  {
    name: 'Acompanhar pedido',
    url: 'pedido-acompanhar',
    icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M5 11v1h8v-7h-10v-1c0-.552.448-1 1-1h10c.552 0 1 .448 1 1v2h4.667c1.117 0 1.6.576 1.936 1.107.594.94 1.536 2.432 2.109 3.378.188.312.288.67.288 1.035v4.48c0 1.089-.743 2-2 2h-1c0 1.656-1.344 3-3 3s-3-1.344-3-3h-4c0 1.656-1.344 3-3 3s-3-1.344-3-3h-1c-.552 0-1-.448-1-1v-6h-2v-2h7v2h-3zm3 5.8c.662 0 1.2.538 1.2 1.2 0 .662-.538 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2zm10 0c.662 0 1.2.538 1.2 1.2 0 .662-.538 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2zm-3-2.8h-10v2h.765c.549-.614 1.347-1 2.235-1 .888 0 1.686.386 2.235 1h5.53c.549-.614 1.347-1 2.235-1 .888 0 1.686.386 2.235 1h1.765v-4.575l-1.711-2.929c-.179-.307-.508-.496-.863-.496h-4.426v6zm1-5v3h5l-1.427-2.496c-.178-.312-.509-.504-.868-.504h-2.705zm-16-3h8v2h-8v-2z"/></svg>',
    class: 'active',
  },
];

//chama o template
router.get('/', function (req, res, next) {
  res.render('site-pedido-acompanhar', {
    title: 'Acompanhar Solicitação - CVBCXS dispensário',
    page: 'site-pedido-acompanhar',
    system: true,
    bodyClass: 'table',
    data: {
      abas: abas,
    },
  });
});

router.post('/', async function (req, res, next) {
  console.log('id:', req.cookies.id);
  var pedidosLoja = await fetchOrdersData(req.cookies.id);
  console.log('pedidosLoja:', pedidosLoja)
  var { email } = req.body;
  res.render('site-pedido-acompanhar', {
    title: 'Acompanhar Solicitação - CVBCXS dispensário',
    page: 'site-pedido-acompanhar',
    system: true,
    bodyClass: 'table',
    data: {
      abas: abas,
      tableHeaders: tableHeaders,
      tableBody: pedidosLoja,
      tablePageHeader: {
        title: 'Solicitações',
      },
    },
  });
});

//envia o email e filtra os pedidos
// router.post('/', function(req, res, next){
//     var { email } = req.body
//     var pedidosLoja = pedidos.getPedidos({userEmail: email});
//     res.render('site-pedido-acompanhar', {
//         title: 'Acompanhar Solicitação - CVBCXS dispensário',
//         page: 'site-pedido-acompanhar',
//         system: true,
//         bodyClass: 'table',
//         data: {
//             abas: abas,
//             tableHeaders: tableHeaders,
//             tableBody: pedidosLoja.data,
//             tablePageHeader: {
//                 title: 'Solicitações',
//             }
//         }
//     });
// });

module.exports = router;
