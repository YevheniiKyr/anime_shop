const authService = require('../services/authService')

class AuthController {

    async signUp(req, res, next) {
        try {
            const {email, password, role} = req.body
            const token = await authService.signUp(email, password, role)
            return res.json({token: token}).status(201)
        }
        catch(e){
            next(e)
        }
    }

    async signIn(req, res, next){
        try {
            const {email, password} = req.body
            const token = await authService.signIn(email, password)
            return res.json({token}).status(200)
        } catch(e) {
            next(e)
        }
    }

    async verify(req, res, next) {
        try {
            const token = authService.genJWT(req.user._id, req.user.email, req.user.role)
            return res.json({token}).status(200)
        } catch(e) {
            next(e)
        }
    }

}
module.exports = new AuthController()