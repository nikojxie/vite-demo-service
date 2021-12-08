const express = require('express');   //引入express模块
const router = express.Router();
const db = require('../utils/db')

// 获得全部的文章数据
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

// 获得全部的文章数据归档
router.get('/file', function (req,res,next) {
    const connection = db.start()
    const sql = `SELECT id,title,created_time,DATE_FORMAT(created_time,'%Y-%c') as created_month from blog_article ORDER BY created_time desc`;
    let str = '';
    connection.query(sql, function (err,result) {
        if(err){
            str = '[SELECT ERROR]:' + err.message
        }else{
            if(result && result.length){
                let map = {};
                for(let item of result) {
                    if(map[item.created_month]){
                        map[item.created_month].push(item)
                    }else {
                        map[item.created_month] = [item]
                    }
                }
                str = map
            }else {
                str = []
            }
        }
        res.send(str);  //服务器响应请求
        connection.end();
    });
})

// 分页获取文章列表
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