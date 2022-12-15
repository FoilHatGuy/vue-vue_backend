const express = require('express');
require('../db');
const auth = require('../oauth-passport')
function init() {
    const router = express.Router();

    // router.get('/google/link', (req, res) => {
    //     res.send('<a href="/auth">Authenticate with Google</a>');
    // });
    //
    // router.post('/google',
    //     passport.authenticate('google', { scope: [ 'email', 'profile' ] }
    //     ));

    // router.get('/success',
    //     passport.authenticate(  {
    //         successRedirect: '/auth', //todo add url
    //         failureRedirect: '/db_api/users'
    //     })
    // );

    router.get('/login/fail', (req, res, next)=> {
        res.send('bad')
    });

    router.post('/register/internal/full', async (req, res, next)=> {
        if(req.body.hasOwnProperty("login") &&
            req.body.hasOwnProperty("password") &&
            req.body.hasOwnProperty("email")
        )
            auth.registerActive(req.body.login, req.body.password, req.body.email)
                .then(r => {
                    console.log(r)
                    res.sendStatus(200)
                })
                .catch((err) => console.log(err))
        else
            res.sendStatus(400)
    });

    router.post('/login/internal', async (req, res, next)=> {

        res.cookie('logged-in', 'true, here is my token')
        res.json({state: 'ok', token: 'this is token'})
    });

    router.get('/logout', (req, res) => {
        req.logout();
        req.session.destroy();
        res.send('Goodbye!');
    });

    return router
}

module.exports = init;
