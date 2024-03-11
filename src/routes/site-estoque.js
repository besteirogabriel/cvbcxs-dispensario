var express = require('express');
var router = express.Router();

// variaveis template
var tableHeaders = {
    medicamento: 'Medicamento',
    composto: 'Composto',
    laboratorio: 'Laboratorio',
    lote: 'Lote',
    fabricacao: 'Fabricação',
    validade: 'Validade',
    quantidade: 'Qtd'
};

router.get('/', function(req, res, next){
    res.render('site-estoque', { 
        title: 'Estoque - CVBCXS dispensário', 
        page: 'estoque table', 
        data: { 
            tableHeaders: tableHeaders, 
            tableBody: req.estoque,             
            tablePageHeader: {
                title: 'Estoque',
                tableActions: {
                    search: true
                },
            }
        } 
    });
});

module.exports = router;