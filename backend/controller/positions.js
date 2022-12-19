const db = require('../db')
module.exports = {
    async getAll() {
        return await db.query('SELECT * FROM positions', [])
    },

    async insert(name) {
        return db.query(`insert into positions("name")
                         values ($1)
                         returning *`, [name])
    },

    async delete(id) {
        return db.query(`DELETE
                         FROM positions
                         WHERE positions.pos_id = $1`, [id])
    },

    async update(id, name) {
        return db.query(`update positions
                         set "name" = $2
                         WHERE pos_id = $1`, [id, name])
    },

    async getId(id) {
        return db.query(`SELECT positions.pos_id as "id", positions.*
                         FROM positions
                         WHERE positions.pos_id = $1`, [id])
    },

    async getIdUsers(id) {
        return db.query(`select users.user_id as "id", users.name, users.surname, users.patronymic
                         from users
                         WHERE users.position = $1`, [id])
    }
}