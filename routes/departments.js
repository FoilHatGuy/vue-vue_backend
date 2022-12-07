const express = require('express');
const ctrl = require('../controller/departments')

// for each: GET, POST(add) /:id
function init() {
    const router = express.Router();

    router.post('/', async (req, res) => {
        if (req.body.name && req.body.name.length > 0) {
            ctrl.insert(req.body.name)
                .then((res) => {
                    console.log(res.rows)
                    return res.rows
                })
                .then((result) => {
                    res.status(200).send(result)
                })
                .catch(() => {
                    res.status(400).json({msg: "Error in database"})
                })
        } else {
            console.log("Wrong name in ", req.body)
            res.status(400).json({msg: "Wrong data"})
        }
    });

    router.get('/', async (req, res) => {
        let result = await ctrl.getAll()
        console.log(result.rows)

        res.send(result.rows)
    });

    router.get('/:id', async (req, res) => {
        // console.log(parseInt(req.params.id, 10))

        if (parseInt(req.params.id, 10)) {
            let department = await ctrl.getId(parseInt(req.params.id, 10))
            let users = await ctrl.getIdUsers(parseInt(req.params.id, 10))
            let result = {department: department.rows[0], users: users.rows}
            console.log(result)
            res.send(result)
        } else
            res.status(400).json({msg: "Id is not numeric"})
    });

    router.post('/:id/edit', async (req, res) => {
        console.log(req.body)
        ctrl.update(req.params.id, req.body.name)
            .then((r) => res.status(200).send(r))
            .catch((r) => {
                console.log(r)
                res.status(400).send(r)
            })
    });

    router.post('/:id/delete', async (req, res) => {
        let user = ctrl.delete(req.params.id)
        user.then((r) => res.status(200).send(r))
            .catch((r) => res.status(400).send(r))
    });

    return router
}

module.exports = init;