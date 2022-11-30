const express = require('express');
const ctrl = require('../controller/projects')

// for each: GET, POST(add) /:id
function init() {
    const router = express.Router();

    router.post('/', async (req, res) => {
        if (req.body.name && req.body.name.length > 0 &&
            req.body.description && req.body.description.length > 0 &&
            req.body.start && req.body.start.length > 0 &&
            req.body.end && req.body.end.length > 0) {

            let result = await ctrl.insert(req.body.name, req.body.description, req.body.start, req.body.end)
            res.status(200).send(result.rows)
        } else
            res.status(400).send({msg: "Wrong data"})
    });

    router.get('/', async (req, res) => {
        let result = await ctrl.getAll()
        result = result.rows
        result.forEach((item) => {
            item.start = ctrl.formatDate(item.start)
            item.end = ctrl.formatDate(item.end)
        })

        res.send(result)
    });

    router.post('/:id/edit', async (req, res) => {
        let promises = []
        console.log(req.body)
        promises.push(ctrl.update(req.params.id, req.body.name,
            req.body.description, req.body.start,
            req.body.end))
        if (req.body.add.length > 0 || req.body.del.length > 0) {
            promises.push(ctrl.updateUsers(req.params.id, req.body.add, req.body.del))
        }
        Promise.all(promises)
            .then((r) => res.status(200).send(r))
            .catch((r) => {
                console.log(r)
                res.status(400).send(r)
            })

        // res.status(400).send(r)
    });

    router.post('/:id/delete', async (req, res) => {
        let user = ctrl.delete(req.params.id)
        user.then((r) => res.status(200).send(r))
            .catch((r) => res.status(400).send(r))
    });

    router.get('/:id', async (req, res) => {
        // console.log(parseInt(req.params.id, 10))

        if (parseInt(req.params.id, 10)) {
            let project = await ctrl.getId(parseInt(req.params.id, 10))
            project = project.rows[0]
            project.start = ctrl.formatDate(project.start)
            project.end = ctrl.formatDate(project.end)
            let users = await ctrl.getIdUsers(parseInt(req.params.id, 10))
            users = users.rows
            let result = {project: project, users: users}
            console.log(result)
            res.send(result)
        } else
            res.status(400).send({msg: "Id is not numeric"})
    });

    return router
}

module.exports = init;