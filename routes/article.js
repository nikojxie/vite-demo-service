const express = require('express');   //引入express模块
const router = express.Router();
const mysql = require('mysql');
const db = require("../utils/db");     //引入mysql模块
const app = express();        //创建express的实例

router.get('/:id', function (req,res,next) {
    const connection = db.start()
    const id = req.params.id
    const sql = `SELECT * FROM blog_article where id = ${id}`;
    let str = '';
    connection.query(sql, function (err,result) {
        if(err){
            // console.log('[SELECT ERROR]:',err.message);
            str = '[SELECT ERROR]:' + err.message
        } else if(!(result && result.length)) {
            str = '[SELECT ERROR]:' + '未能查询到次id的文章'
        } else{
            str = result[0]; //数据库查询结果返回到result中
        }
        res.send(str);  //服务器响应请求
        connection.end();
    });
})

module.exports = router;