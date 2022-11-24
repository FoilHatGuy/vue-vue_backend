const db = require('../db')
module.exports = {
    async getAll(){
        return await db.query('SELECT * FROM system_roles', [])
    },

    async insert(name) {
        return db.query(`insert into "system_roles"("name") 
                                values($1)`, [name])
    },

    async getId(id) {
        return db.query(`SELECT * FROM system_roles WHERE system_roles.id = $1`, [id])
    },

    async getIdUsers(id) {
        return db.query(`SELECT u.id, u.name, u.surname, u.patronymic FROM system_clearance as s_cl
LEFT join
(select users.id, users.name, users.surname, users.patronymic from users) as u
ON s_cl.person = u.id 
LEFT join
(select system_roles.id, system_roles.name from system_roles) as r
ON s_cl.access = r.id 
WHERE s_cl.access = $1`, [id])
    }
}