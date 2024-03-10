const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const router = express.Router();

//chama o template
router.get('/', function(req, res, next){
    res.render('loja-login', { title: 'Login lojas - CVBCXS dispensário' });
});

// Login route
router.post('/', (req, res) => {
    const { email, password } = req.body; //pega os dados do formulário enviado
    const loja = req.lojas.find(loja => loja.email === email); //confere se o email existe na base de dados

    if (!loja) { //se o email não existir na base de dados
        return res.status(401).json({ message: 'Loja não encontrada' }); 
    }

    if (!bcrypt.compareSync(password, loja.password)) { //se a senha for inválida
        return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Gera uma chave secreta única para o usuário
    const secretKey = crypto.randomBytes(64).toString('hex');
    loja.secretKey = secretKey; 

    const token = jwt.sign({ email: loja.email }, secretKey, { expiresIn: '1h' }); //gera um token com expiração de 1h

    res.redirect('/loja-dashboard'); //redireciona para o dashboard se usuário autenticado
});

module.exports = router;