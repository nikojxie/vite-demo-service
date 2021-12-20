const { ErrorModel } = require('../model')

module.exports = (req, res, next) => {
    if (req.session.username) {
        next()
        return
    }
    // 登陆失败，禁止继续执行，所以不需要执行 next()
    res.json(
        new ErrorModel('未登录')
    )
}