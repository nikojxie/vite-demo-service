const express = require('express');   //引入express模块
const router = express.Router();
const {exec} = require("../db/mysql");

// 获得全部的文章数据
const getAll = () => {
    const sql = "SELECT * FROM blog_article where status = 'p' ORDER BY pub_time desc";
    return exec(sql).then(rows => {
        return rows
    })
}

router.get('/all', function (req,res,next) {
    return getAll().then(data => {
        res.json(data)
    })
})

// 获得全部的文章数据归档
const getAllFile = () => {
    const sql = `SELECT id,title,pub_time,DATE_FORMAT(pub_time,'%Y-%c') as created_month from blog_article where status = 'p' ORDER BY pub_time desc`;
    return exec(sql).then(rows => {
        return rows
    })
}

router.get('/file', function (req,res,next) {
    return getAllFile().then(data => {
        let result = ''
        if(data && data.length){
            let map = {};
            for(let item of data) {
                if(map[item.created_month]) map[item.created_month].push(item)
                else map[item.created_month] = [item]
            }
            result = map
        }else {
            result = []
        }
        res.json(result)
    })
})

// 分页获取文章列表
const getAllByPage = (pageNum) => {
    const startNum = (pageNum - 1) * 10
    const pageSize = 10
    const sql = `SELECT * FROM blog_article where status = 'p' ORDER BY pub_time desc limit ${startNum}, ${pageSize}`;
    return exec(sql).then(rows => {
        return rows
    })
}
const getTotalRows = () => {
    const sql = `SELECT count(1) FROM blog_article where status = 'p' `
    return exec(sql).then(totalRows => {
        return Object.values(totalRows[0])[0]
    })
}
router.get('/page/:pageNum', function (req,res,next) {
    const pageNum = req.params.pageNum
    return getAllByPage(pageNum).then(list => {
        getTotalRows().then(totalRows => {
            res.json({totalRows,list})
        })
    })
})

module.exports = router;