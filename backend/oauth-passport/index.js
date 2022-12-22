require('dotenv').config();
const passport = require('passport')
const LocalStrategy = require('passport-custom');
const argon2 = require('argon2')

// const GoogleStrategy = require('passport-google-oauth2').Strategy;

const database = require('./db_controller')

function isLoggedIn(req, res, next) {
    console.log(req.user)
    console.log()
    req.user ? next() : res.sendStatus(401);
}

async function registerActive(login, password, email) {
    return database.isCredentialsAvailable(login, email)
        .then(() => {
            return argon2.hash(password)
        })
        .then(hash => {
            return database.registerActive(login, hash, email)
        })
        .catch((err) => console.log(err))
}

async function registerPassive(email) {
    return database.isCredentialsAvailable(null, email)
        .then(() => {
            return new Promise(() => {
                Crypto.randomBytes(256, (err, buf) => {
                    if (err) throw err;
                    return buf
                })
            })
        })
        .then((salt) => {
            return database.registerPassive(email, salt)
        })

}

async function checkLoginAvailability() {

}

passport.use('database', new LocalStrategy(
    (req, cb) => {
        if (req.body.login && req.body.password) {
            database.getPWByLogin(req.body.login).then((res) => {
                return argon2.verify(res, req.body.password)
            }).then((res) => {
                return res ? database.getUserInfo(req.body.login) : false
            })
                .then((res) => {
                    cb(null, res)
                })
                .catch((err) => {
                    console.log(err)
                    cb(err)
                })
        }
    }
))

//
// passport.use('google', new GoogleStrategy({
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/auth/success`,
//         passReqToCallback: true
//     },
//     function (request, accessToken, refreshToken, profile, done) {
//         return done(null, request.user);
//     }
// ));

passport.serializeUser(function (user, done) {
    console.log('SERIALIZE, ', user)
    done(null, {
        login: user.login,
        email: user.email,
        user_id: user.user_id
    });
});

passport.deserializeUser(function (user, done) {
    // console.log('DESERIALIZE, ', user)
    done(null, user);
});

module.exports = {
    checkLoginAvailability: checkLoginAvailability,
    registerActive: registerActive,
    registerPassive: registerPassive,
    passport: passport,
    isLoggedIn: isLoggedIn
}