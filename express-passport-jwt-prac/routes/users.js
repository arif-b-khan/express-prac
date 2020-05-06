var express = require('express');

var userController = require('../controllers/userController');
var router = express.Router();


module.exports = function (passport) {
    /* GET users listing. */
    router.get('/', passport.authenticate('jwt', { session: false }), userController.getUsers);

    router.post('/signin', userController.signin);
    router.post('/signup', userController.signUp);
    return router;
}

