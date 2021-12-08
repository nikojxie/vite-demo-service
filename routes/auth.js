const express = require('express');   //引入express模块
const router = express.Router();
const db = require("../utils/db");     //引入mysql模块

router.post('/login', function (req,res,next) {
    const connection = db.start()

})

module.exports = router;