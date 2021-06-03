var express = require('express');
var conexion = require('../connection');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.loggedin) {


    let productos = [];
    conexion.query('SELECT * FROM productos', function(err, results) {
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

    res.render('search', data);
  } else {
    res.redirect('/');
  }
});

module.exports = router;