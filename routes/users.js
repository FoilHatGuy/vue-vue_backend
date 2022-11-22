const express = require('express');
const db = require('../db')
const ctrl = require('../controller/users')

// const bodyParser = require('body-parser');
// for each: GET, POST(add) /:id
function init(config){
    const router = express.Router();
    // const parser = bodyParser.json();
    router.post('/', async (req, res, next) => {
        if(req.body.name && req.body.name.length > 0 &&
            req.body.surname && req.body.surname.length > 0 &&
            req.body.patronymic && req.body.patronymic.length > 0){

            let result = await ctrl.insert(req.body.name, req.body.surname, req.body.patronymic)
            res.status(200).send({data: "result.rows"})
            }
        else
            res.status(400).send({msg: "Id is not numeric"})
    });

    router.get('/', async (req, res, next) => {
        let result = await ctrl.getAll()
        console.log(result.rows)
        
        res.send({data: result.rows})
    });

    router.get('/:id', async (req, res, next) => {
        if (parseInt(req.params.id, 10)) {
            let result = await ctrl.getId(parseInt(req.params.id, 10))
            res.send({data: result})
        }
        else
            res.status(400).send({msg: "Id is not numeric"})
    });

    router.get('/:id/projects', async (req, res, next) => {
        console.log(parseInt(req.params.id, 10))

        if (parseInt(req.params.id, 10)) {
            let result = await db.query(`SELECT "project", project_id ,ac.Access
                FROM USERS
                INNER JOIN 
                (SELECT PERSON AS U_PC_ID,
                "access" AS A_PC_ID,
                project AS P_PC_ID
                FROM project_clearance) AS PR_CL
                INNER JOIN
                (SELECT P."id" AS project_id,
                P."name" AS "project"
                FROM PROJECTS AS P) AS pr ON P_PC_ID = project_id
                INNER JOIN
                (SELECT A."id" AS A_ID,
                A."name" AS "access"
                FROM Project_roles AS A) AS ac ON A_PC_ID = A_ID
                ON "id" = U_PC_ID WHERE USERS."id" = $1`, [parseInt(req.params.id, 10)])

            
            console.log(result.rows)
            res.send({data: result.rows})
        }
        else
            res.status(400).send({msg: "Id is not numeric"})
    });

    router.get('/:id/skills', async (req, res, next) => {
        console.log(parseInt(req.params.id, 10))

        if (parseInt(req.params.id, 10)) {
            let result = await db.query(`SELECT skill, skill_id
                FROM USERS
                INNER JOIN 
                (SELECT PERSON AS U_SA_ID,
                skill AS S_SA_ID
                FROM skill_allocation) AS S_A
                INNER JOIN
                (SELECT S."id" AS skill_id,
                S."name" AS "skill"
                FROM skills AS s) AS sk_t ON S_SA_ID = skill_id
                ON "id" = U_SA_ID WHERE USERS."id" = $1`, [parseInt(req.params.id, 10)])

            console.log(result.rows)
            res.send({data: result.rows})
        }
        else
            res.status(400).send({msg: "Id is not numeric"})
    });

    return router
}
module.exports = init;
