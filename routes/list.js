const express = require('express');   //引入express模块
const router = express.Router();
const mysql = require('mysql');     //引入mysql模块
const app = express();        //创建express的实例
const db = require('../utils/db')

router.get('/all', function (req,res,next) {
    const connection = db.start()
    const sql = 'SELECT * FROM blog_article ORDER BY created_time desc';
    let str = '';
    connection.query(sql, function (err,result) {
        if(err){
            // console.log('[SELECT ERROR]:',err.message);
            str = '[SELECT ERROR]:' + err.message
        }else{
            str = result; //数据库查询结果返回到result中
        }
        res.send(str);  //服务器响应请求
        connection.end();
    });
})

router.get('/page/:pageNum', function (req,res,next) {
    const connection = db.start()
    const pageNum = req.params.pageNum
    const startNum = (pageNum - 1) * 10
    const pageSize = 10
    const dataSql = `SELECT * FROM blog_article ORDER BY created_time desc limit ${startNum}, ${pageSize}`;
    const totalRowsSql = `SELECT count(1) FROM blog_article`
    let str = '';
    connection.query(dataSql, function (err,list) {
        connection.query(totalRowsSql, function (err,totalRows) {
            str = {
                totalRows: Object.values(totalRows[0])[0], list
            }
            res.send(str);  //服务器响应请求
            connection.end();
        })
    });
})

module.exports = router;