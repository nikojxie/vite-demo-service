const express = require('express');   //引入express模块
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const cookieParser = require('cookie-parser');

const list = require('./routes/list')
const article = require('./routes/article')
const auth = require('./routes/auth')

const app = express();        //创建express的实例


// 处理 post 请求的 json 数据，此方法支持Express4.16.0+ 的版本，用于取代 body-parser
app.use(express.json());
// 处理 post 请求的 urlencoded 数据(例如 form 表单数据)，支持Express4.16.0+ 的版本
app.use(express.urlencoded({ extended: false }));
// 处理 cookie
app.use(cookieParser())

const redisClient = require('./db/redis').redisClient
const sessionStore = new RedisStore({
    client: redisClient
})
app.use(session({
    resave: true, //添加 resave 选项
    saveUninitialized: true, //添加 saveUninitialized 选项
    secret: 'Niko_#0823', // 密匙可以随意添加，建议由大写+小写+加数字+特殊字符组成
    cookie: {
        path: '/', // 默认配置
        httpOnly: true, // 默认配置，只允许服务端修改
        maxAge: 24 * 60 * 60 * 1000 // cookie 失效时间 24小时
    },
    store: sessionStore  // 将 session 存入 redis
}))

app.use('/auth', auth); // 权限有关接口
app.use('/list', list); // 列表查询
app.use('/article', article); // 文章

app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app

// app.listen(8899, function () {    ////监听3000端口
//     console.log('Server running at 8899 port');
// });