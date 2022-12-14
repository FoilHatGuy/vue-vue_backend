const db = require('../db')

module.exports = {
    getPWByLogin: async (login) => {
        db.query('SELECT acc.password FROM accounts AS acc WHERE acc.login = $1', [login]).then(
            (res) => {
                return res.rows[0].login
            }).catch((err) => {
                console.log(err)
                throw 'noUser'
        })
    }

}