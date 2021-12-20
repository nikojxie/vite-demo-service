const express = require('express');   //引入express模块
const router = express.Router();
const {SuccessModel,ErrorModel} = require('../model')
const {
    getAll,
    getAllFile,
    getAllByPage,
    getTotalRows
} = require('../controller/list')

router.get('/all', function (req,res,next) {
    return getAll().then(data => {
        res.json(new SuccessModel(data))
    })
})

router.get('/file', function (req,res,next) {
    return getAllFile().then(data => {
        let result = {}
        if(data && data.length){
            let map = {};
            for(let item of data) {
                if(map[item.created_month]) map[item.created_month].push(item)
                else map[item.created_month] = [item]
            }
            result = map
        }
        res.json(new SuccessModel(result))
    })
})

router.get('/page/:pageNum', function (req,res,next) {
    const pageNum = req.params.pageNum
    return getAllByPage(pageNum).then(list => {
        getTotalRows().then(totalRows => {
            res.json(new SuccessModel({totalRows,list}))
        })
    })
})

module.exports = router;