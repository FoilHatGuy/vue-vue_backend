
const db = require('../db')
module.exports = {
    async getAll(){
        return await db.query('SELECT * FROM projects', [])
    },

    async delete(id) {
        return db.query(`DELETE FROM projects WHERE projects.id = $1`, [id])
    },

    async update(id, name, desc, start, end) {
        return db.query(`update projects set "name" = $2, description = $3, start = $4, end = $5 
WHERE id = $1`, [id, name, desc?desc:null, start, end?end:null])
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

    formatDate(date){
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