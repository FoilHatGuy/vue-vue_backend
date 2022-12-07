const express = require('express');
require('../db');
const {passport, isLoggedIn} = require('../oauth-passport')
function init() {
    const router = express.Router();

    router.get('/google', (req, res) => {
        res.send('<a href="/auth">Authenticate with Google</a>');
    });

    router.get('/',
        passport.authenticate('google', { scope: [ 'email', 'profile' ] }
        ));


    router.get('/login/fail', (req, res, next)=> {
        res.send('bad')
    });

    router.post('/login', (req, res, next)=> {
        res.json({state: 'ok'})
    });

    router.get('/',
        passport.authenticate('google', { scope: [ 'email', 'profile' ] }
        ));

    router.get('/success',
        passport.authenticate( 'google', {
            successRedirect: '/auth', //todo add url
            failureRedirect: '/db_api/users'
        })
    );

    router.get('/logout', (req, res) => {
        req.logout();
        req.session.destroy();
        res.send('Goodbye!');
    });

    return router
}

module.exports = init;
