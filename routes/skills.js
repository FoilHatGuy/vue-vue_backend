const express = require('express');
const ctrl = require('../controller/skills')

// for each: GET, POST(add) /:id
function init() {
    const router = express.Router();

    router.post('/', async (req, res) => {

        if (req.body.name && req.body.name.length > 0 &&
            req.body.description && req.body.description.length > 0) {

            let result = await ctrl.insert(req.body.name, req.body.description)
            res.status(200).send(result.rows)
        } else
            res.status(400).json({msg: "Wrong data"})
    });

    router.get('/', async (req, res) => {
        let result = await ctrl.getAll()
        console.log(result.rows)

        res.send(result.rows)
    });

    router.post('/:id/edit', async (req, res) => {
        console.log(req.body)
        ctrl.update(req.params.id, req.body.name,
            req.body.description)
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

    router.get('/:id', async (req, res) => {
        // console.log(parseInt(req.params.id, 10))

        if (parseInt(req.params.id, 10)) {
            let skill = await ctrl.getId(parseInt(req.params.id, 10))
            skill = skill.rows[0]
            skill.description = skill.description ?
                skill.description :
                "No description"

            let users = await ctrl.getIdUsers(parseInt(req.params.id, 10))
            users = users.rows

            let result = {skill: skill, users: users}
            console.log(result)
            res.send(result)
        } else
            res.status(400).json({msg: "Id is not numeric"})
    });

    return router
}

module.exports = init;