const express = require('express');
const ctrl = require('../controller/system_roles')

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
                .then((result) => res.status(200).send(result))
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
        if (parseInt(req.params.id, 10)) {
            Promise.all([ctrl.getId(parseInt(req.params.id, 10)),
                ctrl.getIdUsers(parseInt(req.params.id, 10))])
                .then((r)=>{
                    return {system_role:r[0]["rows"][0], users:r[1]["rows"]}
                }).then((r)=>{
                console.log(r)
                res.send(r)
            }).catch((err)=>res.status(400).send({msg: err}))
        } else
            res.status(400).send({msg: "Id is not numeric"})
    });

    //todo: patch doesn't work, dunno why
    router.post('/:id/edit', async (req, res, next) => {
        ctrl.update(req.params.id, req.body.name)
            .then((r)=>res.status(200).send(r))
            .catch((r)=>res.status(400).send(r))
    });

    router.post('/:id/delete', async (req, res, next) => {
        let user = ctrl.delete(req.params.id)
        user.then((r)=>res.status(200).send(r))
            .catch((r)=>res.status(400).send(r))
    });

    return router
}

module.exports = init;