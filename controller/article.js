const {exec} = require("../db/mysql");
const xss = require('xss')
const getDetail = (id) => {
    const sql = `SELECT * FROM blog_article where id = ${id}`;
    return exec(sql).then(rows => {
        return rows[0]
    })
}

module.exports = {
    getDetail,
}