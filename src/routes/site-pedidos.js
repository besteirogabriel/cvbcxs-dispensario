const express = require('express');
const axios = require('axios'); //autocomplete endereço
const router = express.Router();

//chama o template
router.get('/', function(req, res, next){
    res.render('site-pedidos', { title: 'Cadastrar loja - CVBCXS dispensário', page: 'pedidos' });
});


module.exports = router;