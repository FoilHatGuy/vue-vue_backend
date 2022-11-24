
const db = require('../db')
module.exports = {
    async getAll(){
        return await db.query('SELECT * FROM project_roles', [])
    },

    async insert(name) {
        return db.query(`insert into "project_roles"("name") 
                                values($1)`, [name])
    },

    async getId(id) {
        return db.query(`SELECT * FROM SKILLS WHERE project_roles.id = $1`, [id])
    }
    //,
//
//     async getIdUsers(id) {
//         return db.query(`SELECT u.id, u.name, u.surname, u.patronymic FROM SKILL_allocation as s_a
// LEFT join
// (select users.id, users.name, users.surname, users.patronymic from users) as u
// ON person = u.id WHERE s_a.skill = $1`, [id])
//     }
}