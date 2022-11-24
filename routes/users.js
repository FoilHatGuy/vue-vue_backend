const express = require('express');
const db = require('../db')
const ctrl = require('../controller/users')
const cors = require("cors");

// const bodyParser = require('body-parser');
// for each: GET, POST(add) /:id
function init(config){
    const router = express.Router();

    router.post('/', async (req, res, next) => {
        if(req.body.name && req.body.name.length > 0 &&
            req.body.surname && req.body.surname.length > 0 &&
            req.body.patronymic && req.body.patronymic.length > 0){

            let result = await ctrl.insert(req.body.name, req.body.surname, req.body.patronymic)
            res.status(200).send("result.rows")
            }
        else
            res.status(400).send({msg: "Wrong data"})
    });

    router.get('/', async (req, res, next) => {
        let result = await ctrl.getAll()
        // console.log(result.rows)
        
        res.send(result.rows)
    });

    router.get('/:id', async (req, res, next) => {
        if (parseInt(req.params.id, 10)) {
            // console.log(parseInt(req.params.id, 10))
            let result = await ctrl.getId(parseInt(req.params.id, 10))
            // console.log(result)
            res.send(result.rows[0])
        }
        else
            res.status(400).send({msg: "Id is not numeric"})
    });

    //todo: patch doesn't work, dunno why
    router.post('/:id/edit', async (req, res, next) => {
        let user = ctrl.updateUser(req.params.id, req.body.user.name,
            req.body.user.surname, req.body.user.patronymic,
            req.body.user.department, req.body.user.position)
        if (req.body.add.length > 0 || req.body.del.length > 0) {
            console.log(req.body)
            let skills = ctrl.updateSkills(req.params.id, req.body.add, req.body.del)
            Promise.all([user, skills])
                .then((r)=>res.status(200).send(r))
        }
        else
            user.then((r)=>res.status(200).send(r))
        // res.status(400).send(r)
    });

    router.post('/:id/delete', async (req, res, next) => {
        let user = ctrl.deleteUser(req.params.id)
        user.then((r)=>res.status(200).send(r))
            .catch((r)=>res.status(400).send(r))
    });

    router.get('/:id/projects', async (req, res, next) => {
        // console.log(parseInt(req.params.id, 10))

        if (parseInt(req.params.id, 10)) {
            ctrl.getIdProjects(parseInt(req.params.id, 10))
                .then((r)=>res.send(r.rows))
                .catch((r)=>res.status(400).send(r))
        }
        else
            res.status(400).send({msg: "Id is not numeric"})
    });

    router.get('/:id/skills', async (req, res, next) => {
        // console.log(parseInt(req.params.id, 10))

        if (parseInt(req.params.id, 10)) {
            try {
            ctrl.getIdSkills([parseInt(req.params.id, 10)])
                .then((r)=>{
                    if (r.rows[0].skill === null)
                        r.rows = []
                    return r
                }).then((r)=>res.send(r.rows))
                .catch((err)=>res.status(400).send(err))
            } catch (err) {
                res.status(400).send(err)
            }

        }
        else
            res.status(400).send({msg: "Id is not numeric"})
    });

    return router
}
module.exports = init;
