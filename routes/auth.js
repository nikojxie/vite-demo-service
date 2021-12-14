const express = require('express');
const {exec} = require("../db/mysql");
const {ErrorModel,SuccessModel} = require("../model")
const router = express.Router();

const login = (username, password) => {
    const crypto = require('crypto')
    const md5 = crypto.createHash('md5')
    let secretPwd = md5.update(password).digest('hex')
    const sql = `SELECT * FROM accounts_bloguser where username = '${username}' and password = '${secretPwd}'`;
    return exec(sql).then(rows => {
        return rows[0]
    })
}

router.post('/login', function (req,res,next) {
    const { username, password } = req.body
    return login(username, password).then(data => {
        if(data){
            req.session.username = data.username
            res.json(new SuccessModel('登录成功'))
        }else{
            res.json(new ErrorModel('用户名或密码错误'))
        }
    })
})

module.exports = router;