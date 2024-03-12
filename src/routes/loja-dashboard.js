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
router.get('/', function(req, res, next){
    var pedidosLoja = pedidos.getPedidos(2);
    res.render('loja-dashboard', { 
        title: 'Login Dashboard - CVBCXS dispensário', 
        page: 'loja-dashboard', 
        bodyClass: 'table',
        system: true,
        prefix: 'loja',
        data: { 
            tableHeaders: tableHeaders, 
            tableBody: pedidosLoja.data,             
            tablePageHeader: {
                title: 'Solicitações',
            }
        } 
    });
});

module.exports = router;