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
    // var pedidosLoja = pedidos.getPedidos({adminId: 1});
    res.render('admin-dashboard', { 
        title: 'Administrador Dashboard - CVBCXS dispensário', 
        page: 'admin-dashboard', 
        bodyClass: 'table',
        system: true,
        prefix: 'admin',
        // data: { 
        //     tableHeaders: tableHeaders, 
        //     tableBody: pedidosLoja.data,             
        //     tablePageHeader: {
        //         title: 'Solicitações',
        //     }
        // } 
    });
});

module.exports = router;