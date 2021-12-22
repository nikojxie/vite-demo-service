const express = require('express');
const {ErrorModel,SuccessModel} = require("../model")
const router = express.Router();
const {
    login
} = require('../controller/auth')

router.post('/login', function (req,res,next) {
    const { username, password } = req.body
    return login(username, password).then(data => {
        if(data.username){
            req.session.username = data.username
            res.json(new SuccessModel('登录成功'))
            return
        }
        res.json(new ErrorModel('用户名或密码错误'))
    })
})

module.exports = router;