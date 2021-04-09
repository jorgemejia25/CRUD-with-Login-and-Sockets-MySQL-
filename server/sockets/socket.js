const { io } = require('../server');
const server = require('socket.io');
var events = require('events');
const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const img = require('../gets/img');
const login = require('../server')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const connect = require("../config/connection");

io.on('connection', (client) => {

    img.eventEmitter.on('imagen', () => {
        // client.emit('uwu')
        // console.log('eeeee')
    })

    login.eventEmitter.on('badLogin', () => {
        client.emit('badLogin')
    })

    client.on('login', (datos) => {
        connect.con.query(
            `SELECT * from users WHERE user = '${datos.user}'`,
            function(err, results) {
                if (err) throw err;
                if (results.length > 0) {
                    bcrypt.compare(datos.pass, results[0].pass, function(err, result) {
                        if (err) throw err;
                        if (result) {
                            client.emit('goodLogin')
                        } else {
                            client.emit('badLogin')
                        }
                    });
                } else {
                    client.emit('badLogin')
                }
            }
        );
    })


    client.on('enviarCliente', (values) => {
        connect.con.query(
            `INSERT INTO products (nombre, categoria, id_cliente) VALUES ('${values.nombre}','${values.categoria}', '${values.idCliente}')`,
            function(err, result) {
                if (err) throw err;
                console.log(
                    `Datos ingresados con éxito.\n`
                );
                client.emit('ingresoExitoso')
            }
        );
    })

    client.on('enviarCliente', (values) => {
        connect.con.query(
            `INSERT INTO products (nombre, categoria, id_cliente) VALUES ('${values.nombre}','${values.categoria}', '${values.idCliente}')`,
            function(err, result) {
                if (err) throw err;
                console.log(
                    `Datos ingresados con éxito.\n`
                );
                client.emit('ingresoExitoso')
            }
        );
    })


    client.on('recibirBBDD', () => {
        connect.con.query(
            `SELECT * FROM products`,
            function(err, result) {
                if (err) throw err;
                client.emit('enviarBBDD', (result))
                client.emit('enviados al frontend')
            }
        );
    })

    client.on('editarProductos', (bd) => {
        connect.con.query(
            `UPDATE products SET nombre = '${bd.nombre}', categoria= '${bd.categoria}' WHERE id = ${bd.id};`,
            function(err, result) {
                if (err) throw err;
                console.log(
                    `Datos editados con éxito.\n`
                );
                client.emit('datosActualizados')
            }

        );
    })
    client.on('borrarProducto', (bd) => {
        connect.con.query(
            `DELETE FROM products WHERE id=${bd.id};`,
            function(err, result) {
                if (err) throw err;
                console.log(
                    `Datos borrados con éxito.\n`
                );
                client.emit('datosBorrados')
            }

        );
    })

})