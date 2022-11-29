const db = require('../db')
module.exports = {
    async getAll() {
        return await db.query('SELECT * FROM project_roles', [])
    },

    async insert(name) {
        return db.query(`insert into "project_roles"("name") 
                                values($1)`, [name])
    },

    async getId(id) {
        return db.query(`SELECT * FROM project_roles WHERE project_roles.id = $1`, [id])
    },

    async update(id, name) {
        return db.query(`update project_roles set "name" = $2 WHERE id = $1`, [id, name])
    },

    async delete(id) {
        return db.query(`DELETE FROM project_roles WHERE project_roles.id = $1`, [id])
    },

    async getIdUsers(id) {
        return db.query(`SELECT u.id, u.name, u.surname, u.patronymic FROM Project_clearance as p_cl
LEFT join
(select users.id, users.name, users.surname, users.patronymic from users) as u
ON person = u.id WHERE p_cl.access = $1`, [id])
    }
}