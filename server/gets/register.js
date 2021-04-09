const bcrypt = require('bcrypt');
const saltRounds = 10;
const connect = require("../config/connection");
var formidable = require('formidable');
var fs = require('fs');
register = function(req, res) {


    // connect.con.query('CREATE TABLE  IF NOT EXISTS users(  id int NOT NULL primary key AUTO_INCREMENT,create_time DATETIME ,update_time DATETIME,correo varchar(255) ,user VARCHAR(255),pass VARCHAR (255),activo VARCHAR (6),`image_name` varchar(255) DEFAULT NULL)', function(err, result) {
    //     if (err) throw err;
    //     console.log('Tabla users creada con exito')
    //     res.redirect('/register')

    // })

    // var form = new formidable.IncomingForm();
    // form.parse(req, function(err, fields, files) {
    //     var oldpath = files.foto.path;
    //     var newpath = 'C:/Users/jorge/OneDrive/Documentos/NJS/login/server/public/' + files.foto.name;
    //     fs.rename(oldpath, newpath, function(err) {
    //         if (err) throw err;
    //         res.write('File uploaded and moved!');
    //     });
    // })


    let user = req.body.user;
    let correo = req.body.correo;
    let pass = bcrypt.hashSync(req.body.pass, 10);

    connect.con.query(
        `INSERT INTO users (user, correo, pass, ACTIVO) VALUES ('${user}','${correo}', '${pass}', 1)`,
        function(err, result) {
            if (err) throw err;
            console.log(
                `Datos ingresados con éxito.\n` +
                `Correo: ` +
                `${correo}.\n` +
                `Pass: ` +
                `${pass}.`
            );
        }
    );

    res.send('Usuario agregado con exito');
}

module.exports = { register }