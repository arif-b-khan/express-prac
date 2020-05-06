var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
   
// load up the user model
var User = require('../models/user');
var config = require('../config/secret'); // get db config file

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
    algorithms: ['RS256']
  };

module.exports = function (passport) {
    passport.use(new JwtStrategy(options, function (jwt_payload, done) {
        let {sub: id} = jwt_payload;
        let user = User.getUserById(id);
        if(user){
            return done(null, user);
        }
        return done(null, false);
        // User.findOne({id: jwt_payload.id}, function(err, user) {
        //       if (err) {
        //           return done(err, false);
        //       }
        //       if (user) {
        //           done(null, user);
        //       } else {
        //           done(null, false);
        //       }
        //   });
    }));
};