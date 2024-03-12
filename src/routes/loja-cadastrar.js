const express = require('express');
const axios = require('axios'); //autocomplete endereço
const router = express.Router();

// variáveis template
var abas = [
    {
        name: 'Cadastrar loja',
        url: 'loja-cadastrar',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.602 3.7c-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 3.321 0 5.97 2.117 5.97 6.167 0 3.555-1.949 6.833-2.383 7.833h-2.115c.392-1.536 2.499-4.366 2.499-7.842 0-5.153-5.867-4.985-7.369-2.458zm13.398 15.3h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2z"/></svg>',        
        class: 'active'
    },
    {
        name: 'Login loja',
        url: 'loja-login',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 10v-5l8 7-8 7v-5h-8v-4h8zm2-8v2h12v16h-12v2h14v-20h-14z"/></svg>',
    }
];

//chama o template
router.get('/', function(req, res, next){
    res.render('loja-cadastrar', { title: 'Cadastrar loja - CVBCXS dispensário', page: 'loja-cadastrar', data: {abas} });
});


module.exports = router;