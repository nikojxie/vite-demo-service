const express = require('express');   //引入express模块
const router = express.Router();
const {exec} = require("../db/mysql");

const getDetail = (id) => {
    const sql = `SELECT * FROM blog_article where id = ${id}`;
    return exec(sql).then(rows => {
        return rows[0]
    })
}

router.get('/:id', function (req,res,next) {
    // res.cookie("token","123123123",{domain: 'localhost', path: '/', maxAge: 24*60*60*1000 ,httpOnly:true})
    const id = req.params.id
    const result = getDetail(id)
    return result.then(data => {
        res.json(data)
    })
})

module.exports = router;