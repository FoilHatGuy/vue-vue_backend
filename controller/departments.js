const db = require('../db')
module.exports = {
    async getAll() {
        return await db.query('SELECT * FROM departments', [])
    },

    async insert(name) {
        return db.query(`insert into departments("name")
                         values ($1)`, [name])
    },

    async delete(id) {
        return db.query(`DELETE
                         FROM departments
                         WHERE departments.dep_id = $1`, [id])
    },

    async update(id, name) {
        return db.query(`update departments
                         set "name" = $2
                         WHERE dep_id = $1`, [id, name])
    },


    async getId(id) {
        return db.query(`SELECT *
                         FROM departments
                         WHERE departments.dep_id = $1`, [id])
    },

    async getIdUsers(id) {
        return db.query(`select users.user_id, users.name, users.surname, users.patronymic
                         from users
                         WHERE users.department = $1`, [id])
    }
}