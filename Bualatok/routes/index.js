var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

var users = {
  'gonzalo@um.es': {
    password: '1234'

  } 
};

router.post('/', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  
  // MODIFICAR PARA HACER CONEXIÓN CON MYSQL


  if (email && password) {
    var user = users[email];
    if (user) {
      if (password == user['password']){
        req.session.loggedin = true;
        req.session.username = email; // En vez del email, guardar un objeto usuario.
        res.redirect('/home');
      } else {
        res.send('Incorrect username or password')
      } 
    }  else {
      res.send('Incorrect username or password')
    }
    
    res.end();
    
  } else {
    res.send('Enter user and password')
    res.end();
  } 
});

module.exports = router;
