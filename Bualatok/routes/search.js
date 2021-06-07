var express = require('express');
var conexion = require('../connection');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {
  if (req.session.loggedin) {

    let data = req.session.data;

    let newData = {
      user : req.session.user
    }


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

    req.session.data = newData;

    if (data == undefined) {
      newData.productos = productos;
      res.render('search', newData);
    } else {
      data.productos = productos;
      res.render('search', data);
    }
    

  } else {
    res.redirect('/');
  }
});


router.post('/buyitem', function(req, res, next) {
  
  let productId = req.body.idproducto;
  
  let data = {};

  let product;
  let query = 'SELECT * FROM productos WHERE idproducto = '+ productId;
  conexion.query(query, function(err, results) {
    if(results.length) {
      product = results[0];
      let idusuario = req.session.user.idusuario;
      let usercredit = req.session.user.credito;
      if (product.propietario == idusuario) {
        
        console.log("El vendedor no puede comprar su producto");
        data.user = req.session.user;
        data.message = 'El vendedor no puede comprar su producto';
        data.error = true;

        req.session.data = data;
        res.redirect('/search');
      }
    
      else if (product.precio > usercredit) {
        
        console.log("No tiene suficiente credito");
        data.user = req.session.user;
        data.message = 'No tiene suficiente crédito';
        data.error = true;

        req.session.data = data;
        res.redirect('/search');
      }
    
      else {
        let creditoComprador = req.session.user.credito - product.precio;
        conexion.query('UPDATE usuarios SET credito = ' + creditoComprador + ' WHERE idusuario = ' + req.session.user.idusuario, function(err, results) {
          if(err) console.log(err);
        });


        conexion.query('SELECT * FROM usuarios WHERE idusuario = ' + product.propietario, function(err, results) {
          if (results.length) {

            let vendedor = results[0];
            let creditoVendedor = vendedor.credito + product.precio;


            conexion.query('UPDATE usuarios SET credito = ' + creditoVendedor + ' WHERE idusuario = ' + vendedor.idusuario, function(err, results) {
              if (err) console.log(err) 
            });

          }
        })

    
        conexion.query('DELETE FROM productos WHERE idproducto = ' + productId, function(err, results) {
          if(err) console.log(err);
          else {
            fs.unlink('./public/' + product.foto, function() {
              // Importante actualizar el credito del comprador aqui, ya que no se accede a la base de datos para obtener el usuario de nuevo.
              req.session.user.credito = creditoComprador;

              data.user = req.session.user;
              data.message = 'Compra realizada con exito';
              data.success = true;

              req.session.data = data;
              console.log(req.session.data);
              res.redirect('/search');
            })
          }
        })
    
      }
    }
  });
});

module.exports = router;