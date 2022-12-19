// noinspection JSUnresolvedVariable

const db = require('../db')
const format = require("pg-format");
module.exports = {
    async getAll() {
        return await db.query('SELECT proj_id as "id", name, start,"end", description FROM projects', [])
    },

    async delete(id) {
        return db.query(`DELETE
                         FROM projects
                         WHERE projects.proj_id = $1`, [id])
    },

    async update(id, name, desc, start, end) {
        //todo date+1 bruh why pg sets previous day
        return db.query(`update projects
                         set "name"      = $2,
                             description = $3,
                             "start"     = $4::date + 1,
                             "end"       = $5::date + 1
                         WHERE proj_id = $1`, [id, name, desc ? desc : null, start ? start : '01.01.2000', end ? end : null])
    },

    async updateUsers(id, add, del) {
        let Plist = []
        if (add.length > 0) {
            let added = add.map((v) => {
                return [id, v.id, v.role]
            });
            let query1 = format('INSERT INTO user_x_project_x_role (project, "user", project_role) VALUES %L', added);
            console.log(query1)
            Plist.push(db.query(query1, []))
        }
        if (del.length > 0) {
            let deleted = del.map((val) => {
                return val
            });
            let query2 = format('DELETE FROM user_x_project_x_role WHERE project = $1 AND user in (%L)', deleted);
            console.log(query2)
            Plist.push(db.query(query2, [id]))
        }
        return Promise.all(Plist)
    },


    async insert(name, desc, start, end) {
        return db.query(`insert into projects("name", "description", "start", "end")
                         values ($1, $2, $3, $4)`, [name, desc, start, end])
    },

    async getId(id) {
        return db.query(`SELECT *
                         FROM projects
                         WHERE projects.proj_id = $1`, [id])
    },

    async getIdUsers(id) {
        return db.query(`SELECT u.user_id as "id", u.name, u.surname, u.patronymic, p_cl.project_role as id_role, p.name as role
                         FROM user_x_project_x_role as p_cl
                                  LEFT join
                              (select users.user_id, users.name, users.surname, users.patronymic from users) as u
                              ON p_cl.user = u.user_id
                                  LEFT join
                              (select project_roles.name, project_roles.proj_role_id from project_roles) as p
                              ON p_cl.project_role = p.proj_role_id
                         WHERE p_cl.project = $1`, [id])
    },

    formatDate(date) {
        return date ?
            date
                .toISOString()
                .split("T")[0]
                .split('-')
                .reverse()
                .join('.')
            :
            null
    }
}