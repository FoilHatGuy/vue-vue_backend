const express = require('express');
const db = require('../db')

// for each: GET, POST(add), DELETE, GET /:id, GET /:id/users
function init(config){
    const router = express.Router();
    router.get('/projects', async (req, res, next) => {
        let result = await db.query('SELECT * FROM projects', [])
        console.log(result)
        res.send({"message": "I<3U", data: result.rows})
    });

    router.get('/skills', async (req, res, next) => {
        let result = await db.query('SELECT * FROM skills', [])
        console.log(result)
        res.send(result.rows)
    });

    router.get('/positions', async (req, res, next) => {
        let result = await db.query('SELECT * FROM positions', [])
        console.log(result)
        res.send(result.rows)
    });

    router.get('/project_roles', async (req, res, next) => {
        let result = await db.query('SELECT * FROM project_roles', [])
        console.log(result)
        res.send(result.rows)
    });

    router.get('/system_roles', async (req, res, next) => {
        let result = await db.query('SELECT * FROM system_roles', [])
        console.log(result)
        res.send(result.rows)
    });

    router.get('/departments', async (req, res, next) => {
        let result = await db.query('SELECT * FROM departments', [])
        console.log(result)
        res.send(result.rows)
    });
    return router
}
module.exports = init;
