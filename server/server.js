const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const server = http.createServer(app);
const bodyParser = require('body-parser');
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;
const connect = require("./config/connection");
const session = require('express-session');
const routes = require('./routes/routes');
const register = require('./gets/register');
const socketIO = require('socket.io');
const img = require('./gets/img');
const events = require('events');
const home = require('./home/home-routes');
const execFile = require('child_process').execFile;
module.exports.eventEmitter = new events.EventEmitter();
module.exports.io = socketIO(server);
require('./sockets/socket');
module.exports.eventEmitter.setMaxListeners(100)

const bcrypt = require('bcrypt');
const { response } = require('express');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public'));
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use('/', routes);
app.use('/home', home);

app.use(bodyParser.urlencoded({
    extended: true
}));


connect.con.connect(function(err) {
    if (err) throw err;
    console.log("Connectado!");

});

app.post('/register', function(req, res) {
    register.register(req, res)
});

app.post('/login', function(req, res) {

    let user = req.body.user;
    let pass = req.body.pass;


    if (user && pass) {

        connect.con.query(
            `SELECT * from users WHERE user = '${user}'`,
            function(err, results) {
                if (err) throw err;
                bcrypt.compare(pass, results[0].pass, function(err, result) {
                    req.session.loggedin = true;
                    console.log(results[0].image_name)
                    req.session.user = results[0];
                    res.redirect('/home');
                });

            }
        );
    } else {
        res.redirect('/')
    }
})


app.get('*', function(req, res) {
    res.status(404).send('404');
});


app.post('/img', function(req, res, user) {
    user = req.session.user

    img.img(req, res, user)
});

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});