var express = require('express');
var router = express.Router();
var conexion = require('../connection');

router.get('/', function(req, res, next) {

    req.session.destroy();
    res.redirect('/');
  
});

module.exports = router;