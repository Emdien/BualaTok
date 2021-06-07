var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.loggedin) {

    let data = req.session.data;


    let newData = {
      user : req.session.user,
      message : ''
    };

    req.session.data = newData;

    if (data == undefined) {
      res.render('main', newData);
    }
    else 
      res.render('main', data);

  } else {
    res.redirect('/');
  }
});

module.exports = router;
