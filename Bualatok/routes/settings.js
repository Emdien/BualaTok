var express = require('express');
var router = express.Router();
var conexion = require('../connection');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  if (req.session.loggedin) {
    
    let data = req.session.data;
    console.log(data);
    
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
    message : 'Credito actualizado',
    success : true
  };

  let query = 'UPDATE usuarios SET credito = ' + credito + ' WHERE idusuario = ' + req.session.user.idusuario;

  conexion.query(query, function(err, results) {
    if (err) {
      console.log(err);
      data.message = 'Ha ocurrido un error';
      data.success = false;
    } 
  });

  req.session.data = data;

  res.redirect('/settings');

})

module.exports = router;