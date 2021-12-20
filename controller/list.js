const {exec} = require("../db/mysql");

// 获得全部的文章数据
const getAll = () => {
    const sql = "SELECT * FROM blog_article where status = 'p' ORDER BY pub_time desc";
    return exec(sql).then(rows => {
        return rows
    })
}

// 获得全部的文章数据归档
const getAllFile = () => {
    const sql = `SELECT id,title,pub_time,DATE_FORMAT(pub_time,'%Y-%c') as created_month from blog_article where status = 'p' ORDER BY pub_time desc`;
    return exec(sql).then(rows => {
        return rows
    })
}

// 分页获取文章列表
const getAllByPage = (pageNum) => {
    const startNum = (pageNum - 1) * 10
    const pageSize = 10
    const sql = `SELECT * FROM blog_article where status = 'p' ORDER BY pub_time desc limit ${startNum}, ${pageSize}`;
    return exec(sql).then(rows => {
        return rows
    })
}

// 获得文章数量
const getTotalRows = () => {
    const sql = `SELECT count(1) FROM blog_article where status = 'p' `
    return exec(sql).then(totalRows => {
        return Object.values(totalRows[0])[0]
    })
}

module.exports = {
    getAll,
    getAllFile,
    getAllByPage,
    getTotalRows
}