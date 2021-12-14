const mysql = require('mysql');     //引入mysql模块
const {MYSQL_CONF} = require('../conf/db')
let connection = mysql.createConnection(MYSQL_CONF)
connection.connect((err, result) => {
    if (err) {
        console.log("数据库连接失败");
        return;
    }
    console.log("数据库连接成功");
})

// 通过 Promise 统一执行 sql 函数
function exec(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return;
            }
            resolve(result)
        })
    })
}

module.exports = {
    exec,
    escape: mysql.escape
}
