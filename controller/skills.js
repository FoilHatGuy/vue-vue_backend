
const db = require('../db')
module.exports = {
    async getAll(){
        return await db.query('SELECT * FROM skills', [])

}
}