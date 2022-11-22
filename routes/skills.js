var express = require('express');
const ctrl = require('../controller/skills')

// for each: GET, POST(add) /:id
function init(config) {
    const router = express.Router();

    router.get('/', async (req, res, next) => {
        let result = ctrl.getAll()
        console.log(result.rows)

        res.send({data: result.rows})
    });

    router.get('/:id', async (req, res, next) => {
        // console.log(parseInt(req.params.id, 10))

        if (parseInt(req.params.id, 10)) {
            let result = await db.query(`SELECT "id","name"
                FROM SKILLS
//                 INNER JOIN (
//                 (SELECT PERSON AS U_PA_ID,
//                 "position" AS P_PA_ID
//                 FROM POSITION_ALLOCATION) AS POS_A
//                 INNER JOIN
//                 (SELECT P."id" AS P_ID,
//                 P."name" AS "position"
//                 FROM POSITIONS AS P) AS POS ON P_PA_ID = P_ID) AS U_P_TABLE 
//                 ON "id" = U_P_TABLE.U_PA_ID
//                 INNER JOIN (
//                 (SELECT PERSON AS U_DA_ID,
//                 "department" AS D_DA_ID
//                 FROM DEPARTMENT_ALLOCATION) AS DEP_A
//                 INNER JOIN
//                 (SELECT D."id" AS D_ID,
//                 D."name" AS "department"
//                 FROM DEPARTMENTS AS D) AS DEP ON D_DA_ID = D_ID) AS U_D_TABLE 
//                 ON "id" = U_D_TABLE.U_DA_ID WHERE USERS."id" = $1
`, [parseInt(req.params.id, 10)])

            console.log(result.rows)
            res.send({data: result.rows[0]})
        } else
            res.status(400).send({msg: "Id is not numeric"})
    });

    return router
}

module.exports = init;