const express = require('express');
const router = express.Router();
// const lojas = require('../mocks/lojas');
const jwt = require('jsonwebtoken');
const formatLojasData = require('../queries/selects/select-lojas');


// variáveis template
var abas = [
    {
        name: 'Solicitar',
        url: 'pedidos',
        icon: '<svg width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 3.998c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-16.5.5h15v15h-15zm6.75 6.752h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg>',        
        class: 'active'
    },
    {
        name: 'Acompanhar pedido',
        url: 'pedido-acompanhar',
        icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M5 11v1h8v-7h-10v-1c0-.552.448-1 1-1h10c.552 0 1 .448 1 1v2h4.667c1.117 0 1.6.576 1.936 1.107.594.94 1.536 2.432 2.109 3.378.188.312.288.67.288 1.035v4.48c0 1.089-.743 2-2 2h-1c0 1.656-1.344 3-3 3s-3-1.344-3-3h-4c0 1.656-1.344 3-3 3s-3-1.344-3-3h-1c-.552 0-1-.448-1-1v-6h-2v-2h7v2h-3zm3 5.8c.662 0 1.2.538 1.2 1.2 0 .662-.538 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2zm10 0c.662 0 1.2.538 1.2 1.2 0 .662-.538 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2zm-3-2.8h-10v2h.765c.549-.614 1.347-1 2.235-1 .888 0 1.686.386 2.235 1h5.53c.549-.614 1.347-1 2.235-1 .888 0 1.686.386 2.235 1h1.765v-4.575l-1.711-2.929c-.179-.307-.508-.496-.863-.496h-4.426v6zm1-5v3h5l-1.427-2.496c-.178-.312-.509-.504-.868-.504h-2.705zm-16-3h8v2h-8v-2z"/></svg>',
    }
];

//chama o template
router.get('/', function(req, res, next){
    jwt.verify(req.cookies.token, req.cookies.secretKey, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Token inválido' });
        } else {
          req.user = decoded;
        }
      });
      console.log('estoque pedidos', req.estoque)
    res.render('site-pedidos', { 
        user: req.user,
        title: 'Pedidos - CVBCXS dispensário', 
        page: 'pedidos', 
        system: true,
        data: { 
            abas: abas, 
            lojas: req.lojas, 
            estoque: req.estoque
        } 
    });
});

//envia a solicitação
router.post('/', (req, res) => {
    var pedido = req.body; //pega os dados do formulário enviado
    var response = req.pedidos.adicionarPedido(pedido); //adiciona as informações do formulário no array de pedidos do mock
    var message = { //monta a mensagem de retorno
        type: response? 'success' : 'error',
        icon: response? '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm0 1.5c-4.69 0-8.498 3.807-8.498 8.497s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.497-8.497-8.497zm-5.049 8.886 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z" fill-rule="nonzero"/></svg>' : '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.095 19.886 9.248-16.5c.133-.237.384-.384.657-.384.272 0 .524.147.656.384l9.248 16.5c.064.115.096.241.096.367 0 .385-.309.749-.752.749h-18.496c-.44 0-.752-.36-.752-.749 0-.126.031-.252.095-.367zm1.935-.384h15.939l-7.97-14.219zm7.972-6.497c-.414 0-.75.336-.75.75v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5c0-.414-.336-.75-.75-.75zm-.002-3c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" fill-rule="nonzero"/></svg>',
        text: response.message,
        button: response? {
            url: 'pedido-acompanhar',
            text: 'Acompanhar pedido',
        } : false
    }
    res.render('site-pedidos', { //chama novamente o template com mensagem
        title: 'Pedidos - CVBCXS dispensário', 
        page: 'pedidos', 
        system: true,
        data: { 
            abas: abas, 
            lojas: req.lojas, 
            estoque: req.estoque,
            message: message
        } 
    });
});

//busca o endereço da loja
router.get('/buscar-endereco-loja/:id', async (req, res) => {
    const { id } = req.params;
    const lojas = await formatLojasData();
    const lojaSelecionada = lojas.find(loja => loja.id === parseInt(id));
    if (lojaSelecionada) {
        const enderecoLoja = {
            cep: lojaSelecionada.cep,
            endereco: lojaSelecionada.endereco,
            numero: lojaSelecionada.numero_endereco,
            cidade: lojaSelecionada.cidade,
            estado: lojaSelecionada.estado,
            veneravel: lojaSelecionada.vm,
        };
        res.json(enderecoLoja);
    } else {
        res.status(404).json({ error: 'Loja não encontrada.' });
    }
});

module.exports = router;