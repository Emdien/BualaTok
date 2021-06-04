var express = require('express');
var conexion = require('../connection');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.session.loggedin) {


    let productos = [];

    let query = 'SELECT * FROM productos WHERE propietario = ' + conexion.escape(req.session.user.idusuario);

    conexion.query(query, function(err, results) {
      if (results.length) {
        for (producto of results){
          productos.push(producto);
        }
      }
    });

    let data = {
      user : req.session.user,
      productos : productos
    };

    res.render('productlist', data);
  } else {
    res.redirect('/');
  }
});

module.exports = router;