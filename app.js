const express = require('express');   //引入express模块
const app = express();        //创建express的实例

const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const cookieParser = require('cookie-parser');
app.use(cookieParser())
const redisClient = require('./db/redis').redisClient
const sessionStore = new RedisStore({
    client: redisClient
})
app.use(session({
    secret: 'Niko_#0823', // 密匙可以随意添加，建议由大写+小写+加数字+特殊字符组成
    cookie: {
        path: '/', // 默认配置
        httpOnly: true, // 默认配置，只允许服务端修改
        maxAge: 24 * 60 * 60 * 1000 // cookie 失效时间 24小时
    },
    store: sessionStore  // 将 session 存入 redis
}))

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

const list = require('./routes/list')
const article = require('./routes/article')
const auth = require('./routes/auth')
app.use('/auth', auth); // 权限有关接口
app.use('/list', list); // 列表查询
app.use('/article', article); // 文章

app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(8899, function () {    ////监听3000端口
    console.log('Server running at 8899 port');
});