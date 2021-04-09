const path = require('path');
const express = require('express');
const publicPath = path.resolve(__dirname, '../public/');
const app = express();
const server = require('../server')
const login = require('../gets/login')

router = express.Router()

router.get('/', function(req, res) {
    if (req.session.loggedin) {

        res.render('home/home.ejs', { user: req.session.user, imgr: "../home/public/" + req.session.user.image_name })


    } else {
        res.redirect('/')

    }
    res.end();
});


router.get('/view/:pag', function(req, res) {
    if (req.session.loggedin) {

        res.render('home/view.ejs', { user: req.session.user, imgr: "../home/public/" + req.session.user.image_name, pag: req.params.pag })
    } else {
        res.redirect('/')

    }
});


router.get('/create', function(req, res) {
    if (req.session.loggedin) {

        res.render('home/create.ejs', { user: req.session.user, imgr: "../home/public/" + req.session.user.image_name })

    } else {
        res.redirect('/')

    }
});

module.exports = router