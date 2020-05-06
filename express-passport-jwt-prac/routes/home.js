var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET users listing. */
router.get('/', passport.authenticate('jwt', {session:false}), function(req, res, next) {
  res.render('home');
});

module.exports = router;
