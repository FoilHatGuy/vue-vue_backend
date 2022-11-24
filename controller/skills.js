
const db = require('../db')
module.exports = {
    async getAll(){
        return await db.query('SELECT * FROM skills', [])
    },

    async insert(name, desc) {
        return db.query(`insert into "skills"("name", description) 
                                values($1, $2)`, [name, desc])
    },

    async getId(id) {
        return db.query(`SELECT * FROM SKILLS WHERE skills.id = $1`, [id])
    },

    async getIdUsers(id) {
        return db.query(`SELECT u.id, u.name, u.surname, u.patronymic FROM SKILL_allocation as s_a
LEFT join
(select users.id, users.name, users.surname, users.patronymic from users) as u
ON person = u.id WHERE s_a.skill = $1`, [id])
    }
}