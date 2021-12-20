let MYSQL_CONF = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'blog'
}
let REDIS_CONF = {
    host: 'localhost',
    port: '6379',
    auth: '123456'
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF,
}