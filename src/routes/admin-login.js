const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const router = express.Router();

// variáveis template
var abas = [
    {
        name: 'Login administrativo',
        url: 'admin-login',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 10v-5l8 7-8 7v-5h-8v-4h8zm2-8v2h12v16h-12v2h14v-20h-14z"/></svg>',
        class: 'active'
    }
];

//chama o template
router.get('/', function(req, res, next){
    res.render('admin-login', { title: 'Login administrativo - CVBCXS dispensário', page: 'admin-login', data: {abas, abaGhost: true} });
});


// Login route
router.post('/', (req, res) => {
    const { email, password } = req.body; //pega os dados do formulário enviado
    const admin = req.admins.find(admin => admin.email === email); //confere se o email existe na base de dados

    if (!admin) { //se o email não existir na base de dados
        return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    if (!bcrypt.compareSync(password, admin.password)) { //se a senha for inválida
        return res.status(401).json({ message: 'Senha incorreta' });
    }
    const secretKey = crypto.randomBytes(64).toString('hex');
    admin.secretKey = secretKey;
    const token = jwt.sign({ email: admin.email }, secretKey, { expiresIn: '1h' });
    res.cookie('secretKey', secretKey, { httpOnly: true });
    res.cookie('token', token, { httpOnly: true });

    res.redirect('/admin-dashboard'); //redireciona para o dashboard se usuário autenticado
});

module.exports = router;