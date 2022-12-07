require('dotenv').config();
const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth2').Strategy;


function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/auth/success`,
        passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, request.user);
    }
));

passport.serializeUser(function (user, done) {
    console.log('SERIALISE')
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    console.log('DESERIALISE')
    done(null, user);
});

module.exports = {
    passport: passport,
    isLoggedIn: isLoggedIn
}