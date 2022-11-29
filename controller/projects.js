const db = require('../db')
const format = require("pg-format");
module.exports = {
    async getAll() {
        return await db.query('SELECT * FROM projects', [])
    },

    async delete(id) {
        return db.query(`DELETE FROM projects WHERE projects.id = $1`, [id])
    },

    async update(id, name, desc, start, end) {
        return db.query(`update projects set "name" = $2, description = $3, start = $4, end = $5 
WHERE id = $1`, [id, name, desc ? desc : null, start, end ? end : null])
    },

    async updateUsers(id, add, del) {
        let Plist = Array()
        if (add.length > 0) {
            let added = add.map((v) => {
                return [id, v.user, v.role]
            });
            console.log(add)
            let query1 = format('INSERT INTO project_clearance (project, person, access) VALUES %L', added);
            console.log(query1)
            Plist.push(db.query(query1, []))
        }
        if (del.length > 0) {
            let deleted = del.map((val) => {
                return val
            });
            let query2 = format('DELETE FROM project_clearance WHERE person = $1 AND skill in (%L)', deleted);
            console.log(query2)
            Plist.push(db.query(query2, [id]))
        }
        return Promise.all(Plist)
    },


    async insert(name, desc, start, end) {
        return db.query(`insert into projects("name", "description", "start", "end")
                                values($1, $2, $3, $4)`, [name, desc, start, end])
    },

    async getId(id) {
        return db.query(`SELECT * FROM projects WHERE projects.id = $1`, [id])
    },

    async getIdUsers(id) {
        return db.query(`SELECT u.id, u.name, u.surname, u.patronymic, p_cl.access as id_role, p.name as role FROM project_clearance as p_cl
LEFT join
(select users.id, users.name, users.surname, users.patronymic from users) as u
ON p_cl.person = u.id
LEFT join
(select positions.name, positions.id from positions) as p
ON p_cl.access = p.id WHERE p_cl.project = $1`, [id])
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