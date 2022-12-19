const db = require('../db')
const format = require('pg-format')
module.exports = {
    async getAll() {
        return db.query(`SELECT "user_id" as "id",
                                "name",
                                surname,
                                patronymic,
                                (select COUNT(user_x_project_x_role.user)
                                 from user_x_project_x_role
                                 where user_x_project_x_role.user = users.user_id) ::int::boolean
                                as active
                         FROM users`, [])
    },

    async insert(name, surn, patr) {
        return db.query(`insert into "users"("name", "surname", "patronymic")
                         values ($1, $2, $3)`, [name, surn, patr])
    },

    async update(id, name, surn, patr, dep, pos) {
        return db.query(`update users
                         set "name"     = $2,
                             surname    = $3,
                             patronymic = $4,
                             department = $5,
                             "position" = $6
                         WHERE user_id = $1`, [id, name, surn, patr, dep ? dep : null, pos ? pos : null])
    },

    async delete(id) {
        return db.query(`DELETE
                         FROM users
                         WHERE users.user_id = $1`, [id])
    },

    async updateSkills(id, add, del) {
        let Plist = Array()
        if (add.length > 0) {
            let added = add.map((val) => {
                return [id, val]
            });
            console.log(add)
            let query1 = format('INSERT INTO user_x_skill ("user", skill) VALUES %L', added);
            console.log(query1)
            Plist.push(db.query(query1, []))
        }
        if (del.length > 0) {
            let deleted = del.map((val) => {
                return val
            });
            let query2 = format('DELETE FROM user_x_skill WHERE "user" = $1 AND skill in (%L)', deleted);
            console.log(query2)
            Plist.push(db.query(query2, [id]))
        }
        return Promise.all(Plist)
    },

    async getId(id) {
        return db.query(`SELECT "user_id" as "id",
                                "name",
                                SURNAME,
                                PATRONYMIC,
                                "position" as pos_id,
                                pos_n      as "position",
                                DEPARTMENT as dep_id,
                                dep_n      as department,
                                (select COUNT(user_x_project_x_role.user)
                                 from user_x_project_x_role
                                 where user_x_project_x_role.user = $1) ::int::boolean
as active
                         FROM USERS as u
                                  LEFT JOIN (SELECT P.pos_id AS P_ID, P.name AS pos_n FROM POSITIONS AS P) AS POS
                                            ON u.position = POS.P_ID
                                  LEFT JOIN
                                  (SELECT D.dep_id AS D_ID, D.name AS dep_n FROM DEPARTMENTS AS D) AS DEP
                                  ON u.department = DEP.D_ID
                         WHERE u.user_id = $1`, [id])

    },

    async getIdProjects(id) {
        return db.query(`SELECT "project", project_id, ac.Access
                         FROM USERS
                                  LEFT join
                              (SELECT user     AS U_PC_ID,
                                      project_role AS A_PC_ID,
                                      project  AS P_PC_ID
                               FROM user_x_project_x_role) AS PR_CL
                                  LEFT join
                              (SELECT P.proj_id AS project_id,
                                      P."name"  AS "project"
                               FROM PROJECTS AS P) AS pr ON P_PC_ID = project_id
                                  LEFT join
                              (SELECT A.proj_role_id AS A_ID,
                                      A."name"  AS "access"
                               FROM Project_roles AS A) AS ac ON A_PC_ID = A_ID
                              ON "user_id" = U_PC_ID
                         WHERE USERS.user_id = $1`, [id])


    },

    async getIdSkills(id) {
        return db.query(`SELECT skill, skill_id
                         FROM USERS
                                  LEFT join
                              (SELECT user  AS U_SA_ID,
                                      skill AS S_SA_ID
                               FROM user_x_skill) AS S_A
                                  LEFT join
                              (SELECT S."skill_id"   AS skill_id,
                                      S."name" AS "skill"
                               FROM skills AS s) AS sk_t ON S_SA_ID = skill_id
                              ON "user_id" = U_SA_ID
                         WHERE USERS."user_id" = $1`, [id])

    }
}