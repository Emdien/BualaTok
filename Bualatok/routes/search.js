var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.loggedin) {
    res.render('search', req.session.user);
  } else {
    res.redirect('/');
  }
});

module.exports = router;