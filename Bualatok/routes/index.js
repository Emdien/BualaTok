var express = require('express');
var router = express.Router();
var conexion = require('../connection');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  if (req.session.loggedin) {
    res.redirect('/home');
  } else {
    res.render('index', {error : ''});
  }
  
});


router.post('/', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  
  conexion.query('SELECT * FROM usuarios WHERE `email` = ? AND `password` = ?', [email, password], function(err, results) {
    console.log(results);
    if (results.length) {
      req.session.loggedin = true;
      req.session.user = results[0];
      res.redirect('home')
    } else {
      res.render('index', {error : 'Usuario o contraseña erroneos'})
    }
  })
});

module.exports = router;
