const db = require('../db')
module.exports = {
    async getAll() {
        return await db.query('SELECT * FROM positions', [])
    },

    async insert(name) {
        return db.query(`insert into positions("name") 
                                values($1) returning *`, [name])
    },

    async getId(id) {
        return db.query(`SELECT * FROM positions WHERE positions.id = $1`, [id])
    },

    async getIdUsers(id) {
        return db.query(`select users.id, users.name, users.surname, users.patronymic from users
WHERE users.position = $1`, [id])
    }
}