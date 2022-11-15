const express = require('express');
const router = express.Router();
const { Pool, Client } = require('pg')

const pool = new Pool()

const client = new Client()

/* GET users listing. */
router.get('/', async function(req, res, next) {
    await client.connect()
    let r = await client.query('SELECT NOW()')
    await client.end()
    res.send();
});

module.exports = router;
