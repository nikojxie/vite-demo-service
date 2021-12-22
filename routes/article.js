const express = require('express');   //引入express模块
const router = express.Router();
const {SuccessModel,ErrorModel} = require('../model')
const {
    getDetail
} = require('../controller/article')

router.get('/:id', function (req,res,next) {
    const id = req.params.id
    const result = getDetail(id)
    return result.then(data => {
        res.json(new SuccessModel(data))
    })
})

module.exports = router;