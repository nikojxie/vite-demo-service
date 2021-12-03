const mysql = require('mysql');     //引入mysql模块
module.exports = {
    start () {
        const connection = mysql.createConnection({      //创建mysql实例
            host:'*',
            port:'3306',
            user:'*',
            password:'*',
            database:'*'
        });
        connection.connect()
        return connection
    }
}
