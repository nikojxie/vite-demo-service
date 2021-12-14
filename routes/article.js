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
    const id = req.params.id
    const result = getDetail(id)
    return result.then(data => {
        res.json(data)
    })
})

const newArticle = (data) => {
    const sql = `INSERT INTO blog_article (title, body, pub_time, status, views,article_order, author_id, category_id,type, comment_status, created_time, last_mod_time) VALUES ("test", "test", "2021-12-14", "p", 55, 1, 1, 5, "a", "o", "2021-12-14 22:49:25", "2021-12-14 22:49:25")`;
}

module.exports = router;