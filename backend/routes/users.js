const express = require('express');
require('../db');
const ctrl = require('../controller/users')
require("cors");

// const bodyParser = require('body-parser');
// for each: GET, POST(add) /:id
function init() {
    const router = express.Router();

    router.post('/', async (req, res) => {
        if (req.body.name && req.body.name.length > 0 && req.body.surname && req.body.surname.length > 0 && req.body.patronymic && req.body.patronymic.length > 0) {

            await ctrl.insert(req.body.name, req.body.surname, req.body.patronymic);
            res.status(200).send("result.rows")
        } else res.status(400).json({msg: "Wrong data"})
    });

    router.get('/', async (req, res) => {
        let result = await ctrl.getAll()
        // console.log(result.rows)

        res.send(result.rows)
    });

    router.get('/:id', async (req, res) => {
        if (parseInt(req.params.id, 10)) {
            // console.log(parseInt(req.params.id, 10))
            let result = await ctrl.getId(parseInt(req.params.id, 10))
            console.log(result)
            res.send(result.rows[0])
        } else res.status(400).json({msg: "Id is not numeric"})
    });

    //todo: patch doesn't work, dunno why
    router.post('/:id/edit', async (req, res) => {
        new Promise((resolve, reject)=>{
            if(req.body.hasOwnProperty("user") &&
                req.body.hasOwnProperty("add") &&
                req.body.hasOwnProperty("del")
            ) {
                if (req.body.user.hasOwnProperty("name") &&
                    req.body.user.hasOwnProperty("surname") &&
                    req.body.user.hasOwnProperty("patronymic") &&
                    req.body.user.hasOwnProperty("department") &&
                    req.body.user.hasOwnProperty("position"))
                    resolve("ok")
                else reject("User fields are incomplete")
            }
            else reject("Body fields are incomplete")
        }).then(()=>{
            let promises = []
            promises.push(ctrl.update(req.params.id, req.body.user.name,
                                    req.body.user.surname, req.body.user.patronymic,
                                    req.body.user.department, req.body.user.position))
            if(req.body.add.length > 0 || req.body.del.length > 0){
                promises.push(ctrl.updateSkills(req.params.id, req.body.add, req.body.del))
            }
            Promise.all(promises)
                .then((r) => res.status(200).send(r))
                // .catch((r) => res.status(400).send(r))

        }).catch((r) => res.status(400).send(r))
    });

    router.post('/:id/delete', async (req, res) => {
        let user = ctrl.delete(req.params.id)
        user.then((r) => res.status(200).send(r))
            .catch((r) => res.status(400).send(r))
    });

    router.get('/:id/projects', async (req, res) => {
        // console.log(parseInt(req.params.id, 10))

        if (parseInt(req.params.id, 10)) {
            ctrl.getIdProjects(parseInt(req.params.id, 10))
                .then((r) => res.send(r.rows))
                .catch((r) => {
                    console.log(req, "\n\n\n", r)
                    res.status(400).send(r)
                })
        } else res.status(400).json({msg: "Id is not numeric"})
    });

    router.get('/:id/skills', async (req, res) => {
        // console.log(parseInt(req.params.id, 10))

        if (parseInt(req.params.id, 10)) {
            try {
                ctrl.getIdSkills(parseInt(req.params.id, 10))
                    .then((r) => {
                        console.log(r.rows)
                        if (r.rows[0].skill === null) r.rows = []
                        return r
                    }).then((r) => res.send(r.rows))
                    .catch((r) => {
                        console.log(req, "\n\n\n", r)
                        res.status(400).send(r)
                    })
            } catch (err) {
                res.status(400).send(err)
            }

        } else res.status(400).json({msg: "Id is not numeric"})
    });

    return router
}

module.exports = init;
