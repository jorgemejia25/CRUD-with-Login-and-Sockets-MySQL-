const bcrypt = require('bcrypt');
const saltRounds = 10;
const connect = require("../config/connection");
var formidable = require('formidable');
var fs = require('fs');
const socketIO = require('socket.io');
var events = require('events');
var eventEmitter = new events.EventEmitter();
eventEmitter.setMaxListeners(100)
img = function(req, res, user) {


    // connect.con.query('CREATE TABLE  IF NOT EXISTS users(  id int NOT NULL primary key AUTO_INCREMENT,create_time DATETIME ,update_time DATETIME,correo varchar(255) ,user VARCHAR(255),pass VARCHAR (255),activo VARCHAR (6),`image_name` varchar(255) DEFAULT NULL)', function(err, result) {
    //     if (err) throw err;
    //     console.log('Tabla users creada con exito')
    //     res.redirect('/register')

    // })

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var oldpath = files.foto.path;
        var newpath = 'C:/Users/jorge/OneDrive/Documentos/NJS/login/public/home/public/' + files.foto.name;
        if (user != undefined) {
            fs.rename(oldpath, newpath, function(err) {
                if (err) res.redirect('/login')
                eventEmitter.emit('imagen');

                connect.con.query(
                    `UPDATE users SET image_name = '${files.foto.name}' WHERE id = ${user.id};`,
                    function(err, result) {
                        if (err) throw err;
                        console.log('Imagen actualizada');
                        // res.redirect('/login')
                        // res.redirect('/home')
                        res.redirect('/')

                        res.end()

                        // socketIO.on('connection', (client) => {
                        //     client.emit('imagenSubida');
                        // });
                    }
                );
            });
        } else {
            res.redirect('/')
        }

    })


}

module.exports = { img, eventEmitter, events }