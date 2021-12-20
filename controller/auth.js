const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
    username = escape(username) // 防止sql注入
    password = genPassword(password)
    password = escape(password)
    const sql = `SELECT * FROM accounts_bloguser where username = '${username}' and password = '${secretPwd}'`;
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    login
}