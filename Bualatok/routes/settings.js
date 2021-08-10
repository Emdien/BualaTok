var express = require('express');
var router = express.Router();
var conexion = require('../connection');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  if (req.session.loggedin) {
    
    let data = req.session.data;
    
    let newData = {
      user : req.session.user,
      message : ''
    };
    req.session.data = newData;

    if (data == undefined) {
      res.render('settings', newData);
    } else 
      res.render('settings', data);
  } else {
    res.redirect('/');
  }
  
});


router.post('/addcredito', function(req, res, next) {

  let incCredito = parseInt(req.body.credito);
  let creditoActual = req.session.user.credito;
  let credito = incCredito + creditoActual;

  req.session.user.credito = credito;
  let data = {
    user : req.session.user,
    message : '',
  };

  let query = 'UPDATE usuarios SET credito = ' + credito + ' WHERE idusuario = ' + req.session.user.idusuario;

  conexion.query(query, function(err, results) {
    if (err) {
      console.log(err);
      data.message = 'Ha ocurrido un error';
      data.error = true;

      req.session.data = data;

      res.redirect('/settings');
      
    } 
    else {
      data.message = 'Credito actualizado';
      data.success = true;

      req.session.data = data;

      res.redirect('/settings');
    }
  });

 

});


router.post('/modify-user', function(req, res, next) {
  let nombre = req.body.nombre;
  let apellidos = req.body.apellidos;
  let provincia = req.body.provincia;
  let username = req.body.username;
  let email = req.body.email;

  var data = {
    user : req.session.user,
    message : '',
  };

  let query = 'UPDATE usuarios SET nombre = ' + conexion.escape(nombre) + ', apellidos = ' + conexion.escape(apellidos) + ', provincia = ' + conexion.escape(provincia) + ', username = ' + conexion.escape(username) + ', email = ' + conexion.escape(email) + ' WHERE idusuario = ' + req.session.user.idusuario;
  console.log(query);
  conexion.query(query, function(err, results) {
    if (err) {
      console.log("Error al actualizar la informacion")
      console.log(err);
      data.message = 'Error al actualizar la información'
      data.error = true;

      req.session.data = data;
    
      res.redirect('/settings')

    } 
    else {

      let query = 'SELECT * FROM usuarios WHERE idusuario = ' + req.session.user.idusuario;
      conexion.query(query, function(err, results) {
        if (results.length) {

          req.session.user = results[0];
          data.user = req.session.user;
          data.message = 'Información del usuario actualizada';
          data.success = true;

          req.session.data = data;
        
          res.redirect('/settings')
  
        }
      })

    }
  });

});

router.post('/password', function(req, res, next) {
  let password = req.body.password;

  let data = {
    user : req.session.user
  };

  let query = 'UPDATE usuarios SET password = ' + conexion.escape(password) + ' WHERE idusuario = ' + req.session.user.idusuario;
  conexion.query(query, function(err, results) {
    if (err) {

      console.log(err);
      data.message = 'Error al actualizar la contraseña';
      data.error = true;
      
      req.session.data = data;

      res.redirect('/settings');


    }
    else {

      data.message = 'Contraseña actualizada';
      data.success = true;
      req.session.user.password = password;

      data.user = req.session.user;
      req.session.data = data;

      res.redirect('/settings');
    }
  })

});

router.get('/checkCurrentPassword', function(req, res, next) {
  if (req.session.loggedin) {
    res.json({password : req.session.user.password});
  } else {
    res.redirect('/');
  }
  
});
module.exports = router;