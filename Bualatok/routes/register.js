var express = require('express');
var conexion = require('../connection');
var router = express.Router();

router.get('/', function(req, res, next) {
      res.render('register');
});

router.post('/', function(req, res, next) {
    var nombre = req.body.nombre;
    var apellidos = req.body.apellidos;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var provincia = req.body.provincia;
    var credito = req.body.credito;

    conexion.query("INSERT INTO usuarios (nombre, apellidos, username, email, password, provincia, credito) VALUES (?,?,?,?,?,?,?)", 
    [nombre, apellidos, username, email, password, provincia, credito] ,function(err, results) {
        if (!err) {
            console.log("Cuenta creada con exito");
            res.redirect('/');
        }
        else {
            console.log(results);
            console.log("failure");
        }
        
    });
})

module.exports = router;
