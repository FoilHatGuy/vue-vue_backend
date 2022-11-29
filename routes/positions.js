const express = require('express');
const ctrl = require('../controller/positions')

// for each: GET, POST(add) /:id
function init(config) {
    const router = express.Router();

    router.post('/', async (req, res, next) => {
        if (req.body.name && req.body.name.length > 0) {
            ctrl.insert(req.body.name)
                .then((res) => {
                    return res.rows
                })
                .then((result) => {
                    // console.log("200:", result)
                    res.status(200).send(result)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(400).send(err)
                })
        } else {
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
            Promise.all(
                [ctrl.getId(parseInt(req.params.id, 10)),
                    ctrl.getIdUsers(parseInt(req.params.id, 10))]
            ).then(([position, users]) => {
                return {position: position.rows[0], users: users.rows}
            }).then((result) => {
                console.log(result)
                res.send(result)
            })
                .catch((error) =>
                    res.status(400).send({msg: error}))
        } else
            res.status(400).send({msg: "Id is not numeric"})
    });

    return router
}

module.exports = init;