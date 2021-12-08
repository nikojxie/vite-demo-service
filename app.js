const express = require('express');   //引入express模块
const app = express();        //创建express的实例

const list = require('./routes/list')
const article = require('./routes/article')
const auth = require('./routes/auth')

app.use('/auth', list); // 列表查询
app.use('/list', list); // 列表查询
app.use('/article', article); // 文章

app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(8899,function () {    ////监听3000端口
    console.log('Server running at 8899 port');
});