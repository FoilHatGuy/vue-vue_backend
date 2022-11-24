const express = require('express');
const ctrl = require('../controller/projects')

// for each: GET, POST(add) /:id
function init(config) {
    const router = express.Router();

    router.post('/', async (req, res, next) => {
        if(req.body.name && req.body.name.length > 0 &&
            req.body.description && req.body.description.length > 0 &&
            req.body.start && req.body.start.length > 0 &&
            req.body.end && req.body.end.length > 0){

            let result = await ctrl.insert(req.body.name, req.body.description, req.body.start, req.body.end)
            res.status(200).send(result.rows)
        }
        else
            res.status(400).send({msg: "Wrong data"})
    });

    router.get('/', async (req, res, next) => {
        let result = await ctrl.getAll()
        result = result.rows
        result.forEach((item) => {
            item.start = ctrl.formatDate(item.start)
            item.end = ctrl.formatDate(item.end)
        })

        res.send(result)
    });

    router.get('/:id', async (req, res, next) => {
        // console.log(parseInt(req.params.id, 10))

        if (parseInt(req.params.id, 10)) {
            let project = await ctrl.getId(parseInt(req.params.id, 10))
            project = project.rows[0]
            project.start = ctrl.formatDate(project.start)
            project.end = ctrl.formatDate(project.end)
            let users = await ctrl.getIdUsers(parseInt(req.params.id, 10))
            users = users.rows
            let result = {project:project, users:users}
            console.log(result)
            res.send(result)
        } else
            res.status(400).send({msg: "Id is not numeric"})
    });

    return router
}

module.exports = init;