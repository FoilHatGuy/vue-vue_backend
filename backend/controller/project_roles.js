const db = require('../db')
module.exports = {
    async getAll() {
        return await db.query('SELECT proj_role_id as "id", project_roles.* FROM project_roles', [])
    },

    async insert(name) {
        return db.query(`insert into "project_roles"("name")
                         values ($1)`, [name])
    },

    async getId(id) {
        return db.query(`SELECT proj_role_id as "id", project_roles.*
                         FROM project_roles
                         WHERE project_roles.proj_role_id = $1`, [id])
    },

    async update(id, name) {
        return db.query(`update project_roles
                         set "name" = $2
                         WHERE proj_role_id = $1`, [id, name])
    },

    async delete(id) {
        return db.query(`DELETE
                         FROM project_roles
                         WHERE project_roles.proj_role_id = $1`, [id])
    },

    async getIdUsers(id) {
        return db.query(`SELECT u.user_id, u.name, u.surname, u.patronymic
                         FROM user_x_project_x_role as p_cl
                                  LEFT join
                              (select users.user_id, users.name, users.surname, users.patronymic from users) as u
                              ON user = u.user_id
                         WHERE p_cl.project_role = $1`, [id])
    }
}