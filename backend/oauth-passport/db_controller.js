const db = require('../db')

module.exports = {
    getPWByLogin: async (login) => {
        return db.query('SELECT acc.active, acc.password FROM accounts AS acc WHERE acc.login = $1', [login]).then(
            (res) => {
                if (res.rows.length > 0) {
                    if (res.rows[0].active)
                        return res.rows[0].password
                }
                throw 'noUser'
            }).catch((err) => {
            console.log(err)
            throw 'DBError'
        })
    },

    getUserInfo: async (login) => {
        console.log('INFO')
        return db.query('SELECT * FROM accounts AS acc WHERE acc.login = $1', [login]).then(
            (res) => {
                if (res.rows.length > 0) {
                    if (res.rows[0].active)
                        return res.rows[0]
                }
                throw 'noUser'
            }).catch((err) => {
            console.log(err)
            throw 'DBError'
        })
    },

    isCredentialsAvailable: async (login, email) => {
        return db.query(`SELECT acc.login, acc.email
                  FROM accounts AS acc
                  WHERE acc.login = $1
                     OR acc.email = $2`, [login, email])
            .then((res) => {
                return res.rowCount === 0;
            })
            .catch((err) => {
                console.log(err)
                throw 'DBError'
            })

    },

    registerActive: async (login, password, email) => {
        console.log(login)
        return db.query(`INSERT INTO accounts(login, password, email, active)
                  VALUES ($1, $2, $3, true)`, [login, password, email]).then(
            (res) => {
                console.log(res)
                return true
            }).catch((err) => {
            console.log(err)
            throw 'DBError'
        })

    },

    registerPassive: async (email) => {
        return db.query(`INSERT INTO accounts(email)
                  VALUES ($1)`, [email]).then(
            (res) => {
                console.log(res)
                return true
            }).catch((err) => {
            console.log(err)
            throw 'DBError'
        })

    }

}