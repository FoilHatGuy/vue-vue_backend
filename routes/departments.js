const express = require('express');
const ctrl = require('../controller/departments')

// for each: GET, POST(add) /:id
function init(config) {
    const router = express.Router();

    router.post('/', async (req, res, next) => {
        if(req.body.name && req.body.name.length > 0) {
            ctrl.insert(req.body.name)
                .then((res) => {
                    console.log(res.rows)
                    return res.rows
                })
                .then((result) => {
                    res.status(200).send(result)
                })
                .catch(() => {
                    res.status(400).send({msg: "Error in database"})
                })
        }
        else {
            console.log("Wrong name in ", req.body)
            res.status(400).send({msg: "Wrong data"})
        }
    });

    router.get('/', async (req, res, next) => {
        let result = await ctrl.getAll()
        console.log(result.rows)

        res.send(result.rows)
    });

    router.get('/:id', async (req, res, next) => {
        // console.log(parseInt(req.params.id, 10))

        if (parseInt(req.params.id, 10)) {
            let department = await ctrl.getId(parseInt(req.params.id, 10))
            let users = await ctrl.getIdUsers(parseInt(req.params.id, 10))
            let result = {department:department.rows[0], users:users.rows}
            console.log(result)
            res.send(result)
        } else
            res.status(400).send({msg: "Id is not numeric"})
    });

    return router
}

module.exports = init;