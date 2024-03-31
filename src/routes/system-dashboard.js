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
    console.log(req.user);
    //busca os pedidos
    var pedidosAll = pedidos.getPedidos({ id: req.user.id, type: req.user.type});

    console.log('pedidosAll', pedidosAll);
    //renderiza a página
    res.render('system-dashboard', { 
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
            }
        } 
    });
});

module.exports = router;