const jwt = require('jsonwebtoken')
const ApiError = require("../exceptions/apiError");

module.exports = function (role) {
    return function (req,res,next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]

            if (!token) {
                throw ApiError.UnauthorizedError()
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                throw ApiError.AccessDeniedError()
            }
            req.user = decoded
            next()
        } catch (e) {
            if(e.status === 403) {
                next(e)
            }
            else {
                next(ApiError.UnauthorizedError())
            }
        }
    }
}