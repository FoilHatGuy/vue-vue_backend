
const db = require('../db')
module.exports = {
    async getAll(){
        return db.query('SELECT * FROM users', [])

},
    async insert(name, surn, patr){
        return db.query(`insert into "users"("name", "surname", "patronymic") 
                                values($1, $2, $3)`, [name, surn, patr])
    },
    async getId(id){
        return db.query(`SELECT "id","name",SURNAME,PATRONYMIC,"position",DEPARTMENT, Active
                FROM USERS
                INNER JOIN (
                (SELECT PERSON AS U_PA_ID,
                "position" AS P_PA_ID
                FROM POSITION_ALLOCATION) AS POS_A
                INNER JOIN
                (SELECT P."id" AS P_ID,
                P."name" AS "position"
                FROM POSITIONS AS P) AS POS ON P_PA_ID = P_ID) AS U_P_TABLE 
                ON "id" = U_P_TABLE.U_PA_ID
                INNER JOIN (
                (SELECT PERSON AS U_DA_ID,
                "department" AS D_DA_ID
                FROM DEPARTMENT_ALLOCATION) AS DEP_A
                INNER JOIN
                (SELECT D."id" AS D_ID,
                D."name" AS "department"
                FROM DEPARTMENTS AS D) AS DEP ON D_DA_ID = D_ID) AS U_D_TABLE 
                ON "id" = U_D_TABLE.U_DA_ID WHERE USERS."id" = $1`, [id]).rows[0]

    }
}