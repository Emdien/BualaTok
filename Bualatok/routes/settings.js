var express = require('express');
var router = express.Router();
var conexion = require('../connection');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  if (req.session.loggedin) {
    res.render('settings', req.session.user);
  } else {
    res.redirect('/');
  }
  
});

module.exports = router;