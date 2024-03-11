var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('site-home', { title: 'Home - CVBCXS dispensário', page: 'site-home' });
});

module.exports = router;