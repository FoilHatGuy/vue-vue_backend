
const db = require('../db')
module.exports = {
    async getAll(){
        return await db.query('SELECT * FROM projects', [])
    },

    async insert(name, desc, start, end) {
        return db.query(`insert into projects("name", "description", "start", "end")
                                values($1, $2, $3, $4)`, [name, desc, start, end])
    },

    async getId(id) {
        return db.query(`SELECT * FROM projects WHERE projects.id = $1`, [id])
    },

    async getIdUsers(id) {
        return db.query(`SELECT u.id, u.name, u.surname, u.patronymic FROM project_clearance as p_cl
LEFT join
(select users.id, users.name, users.surname, users.patronymic from users) as u
ON p_cl.person = u.id WHERE p_cl.project = $1`, [id])
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