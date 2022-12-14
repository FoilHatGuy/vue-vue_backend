require('dotenv').config();
const passport = require('passport')
const {Strategy} = require("passport-custom");
const argon2 = require('argon2')

const passportCustom = require('passport-custom')
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const database = require('./db_controller')

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

passport.use('database', new passportCustom.Strategy(
    (req, cb) => {
        if (req.body.hasOwnProperty('login') && req.body.hasOwnProperty('password')) {
            database.getPWByLogin(req.body.login).then((res) => {
                return argon2.verify(res, req.body.password)
            }).then((res) => {
                return res ? req.body.login : null
            })
                .then((res) => {
                    if (res) cb(null, res)
                    else throw 'PasswordIncorrect'
                })
                .catch((err) => {
                    console.log(err)
                    cb(err)
                })
        }
    }
))


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
    console.log('SERIALIZE')
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    console.log('DESERIALIZE')
    done(null, user);
});

module.exports = {
    passport: passport,
    isLoggedIn: isLoggedIn
}