const express = require('express');
require('../db');
const schema = require('../controller/requests')

// for each: GET, POST(add), DELETE, GET /:id, GET /:id/users
function init() {
    const router = express.Router();
    router.get('/', async (req, res) => {
        console.log(schema)
        res.send(schema)
    });
    return router
}

module.exports = init;
