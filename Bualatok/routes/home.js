var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.loggedin) {
    res.render('main', req.session.user);
  }
});

module.exports = router;
