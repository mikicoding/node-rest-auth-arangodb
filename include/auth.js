var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt  = require('passport-jwt').ExtractJwt;
var config      = require('./../include/config');
 
module.exports = function(passport) {
  var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.jwt_secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        if (jwt_payload.expiration <= Date.now()){
            return done(null, false, {msg: 'Token expired.'});
        }else{
            return done(null, jwt_payload);
        }
  }));
  return {
      initialize: function() {
          return passport.initialize();
      },
      authenticate: function() {
          return passport.authenticate('jwt', { session: false});
      },
      getToken: function (headers) {
        if (headers && headers.authorization) {
          var parted = headers.authorization.split(' ');
          if (parted.length === 2) {
            return parted[1];
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
  };
};