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
    res.render('site-estoque', { title: 'Estoque - CVBCXS dispensário', page: 'estoque', data: { tableHeaders: tableHeaders, tableBody: req.estoque, tableFilters: {search: true} } });
});

module.exports = router;