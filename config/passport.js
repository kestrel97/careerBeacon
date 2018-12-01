const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// const User = require('../models/user');
const AuthService = require('../services/authService');
const authService = new AuthService();
const general_config = require('../config/general_config');

module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = general_config.secret;

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        authService.getUserByUsername(jwt_payload.username, (err, user) => {
            if (err) {
                return done(err, false);
            }

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }))
    opts.issuer = 'accounts.examplesoft.com';
    opts.audience = 'yoursite.net';
}
