const path = require('path');
const express = require('express');
const publicPath = path.resolve(__dirname, '../public/');
const app = express();
const server = require('../server')
const login = require('../gets/login')

router = express.Router()

router.get('/', function(req, res) {
    res.render("login/index.ejs", { errormessage: server.errormessage });

});

router.get('/register', function(req, res) {
    res.render("login/register.ejs");
    // console.log(publicPath)

});



router.get('/badlogin', function(req, res) {
    res.render('login/badlogin.ejs')
});


module.exports = router;