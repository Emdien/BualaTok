var express = require('express');
var conexion = require('../connection');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.session.loggedin) {

    let productos = [];
    let query = 'SELECT * FROM productos';
    let first_value = true;

    Object.getOwnPropertyNames(req.query).forEach(function(val, index, array) {
      if (req.query[val] != null && req.query[val] != undefined && req.query[val] != "") {
        
        if (first_value){

          if (val == 'min') {
            query += ' WHERE precio >= ' + parseInt(req.query[val]) + ' ';
            first_value = false;
          } else if (val == 'max') {
            query += ' WHERE precio <= ' + parseInt(req.query[val]) + ' ';
            first_value = false;
          } else {
            query += " WHERE " + val + ' = ' + conexion.escape(req.query[val]) + ' ';
            first_value = false;
          }

        } 
        else {

          if (val == 'min') {
            query += ' AND precio >= ' + parseInt(req.query[val]) + ' ';
          } else if (val == 'max') {
            query += ' AND precio <= ' + parseInt(req.query[val]) + ' ';
          } else {
            query += 'AND ' + val + ' = ' + conexion.escape(req.query[val]) + ' ';
          }

        }
      }
    })

    query = query.trim();

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

    res.render('search', data);
  } else {
    res.redirect('/');
  }
});

module.exports = router;