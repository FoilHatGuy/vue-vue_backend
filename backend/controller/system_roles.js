const db = require('../db')
module.exports = {
    async getAll() {
        return await db.query('SELECT * FROM system_roles', [])
    },

    async insert(name) {
        return db.query(`insert into "system_roles"("name")
                         values ($1)`, [name])
    },

    async getId(id) {
        return db.query(`SELECT *
                         FROM system_roles
                         WHERE system_roles.system_role_id = $1`, [id])
    },

    async update(id, name) {
        return db.query(`update system_roles
                         set "name" = $2
                         WHERE system_role_id = $1`, [id, name])
    },

    async delete(id) {
        return db.query(`DELETE
                         FROM system_roles
                         WHERE system_roles.system_role_id = $1
                         returning *`, [id])
    },

    async getIdUsers(id) {
        return db.query(`SELECT u.user_id, u.name, u.surname, u.patronymic
                         FROM user_x_sys_role as s_cl
                                  LEFT join
                              (select users.user_id, users.name, users.surname, users.patronymic from users) as u
                              ON user = u.user_id
                         WHERE s_cl.system_role = $1`, [id])
    }
}