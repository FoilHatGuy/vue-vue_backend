const express = require('express');
const router = express.Router();
const db = require('../db')

/* GET users listing. */
router.get('/', async (req, res, next) => {
    let result = await db.query('SELECT * FROM users', [])
    console.log(result)
    res.send(result.rows)

});

module.exports = router;
