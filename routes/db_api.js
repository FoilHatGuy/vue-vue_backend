const express = require('express');
const db = require('../db')
const schema = require('../controller/requests')

// for each: GET, POST(add), DELETE, GET /:id, GET /:id/users
function init(config) {
    const router = express.Router();
    router.get('/', async (req, res, next) => {
        console.log(schema)
        res.send(schema)
    });
    return router
}

module.exports = init;
