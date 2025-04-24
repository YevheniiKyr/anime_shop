const bcrypt = require('bcrypt')
require(`dotenv`).config();
const Basket = require('../Models/basket')
const User = require('../Models/user')
const jwt = require('jsonwebtoken')

const genJWT = (_id, email, role) => {
    return jwt.sign(
        {_id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '12h'}
    )
}

class AuthController {

    async signup(req, res) {
        try {
            const {email, password, role} = req.body
            if (!email || !password) {
                return (res.status(400).json({message:"You didn't input password or email  "}))
            }
            const existingUser = await User.findOne({
                email: email
            })
            if (existingUser) {
                return res.status(400).json({message: `Це ім'я вже зайнято: ${email} `})
            }
            const hashPass = await bcrypt.hash(password, 3)
            const user = await User.create({email: email, password: hashPass, role: role})
            const basket = await Basket.create({user: user._id})
            const token = genJWT(user._id, user.email, user.role)
            return res.json({token: token})
        }
        catch(e){
            res.status(500).json(e)
        }
    }

    async signIn(req, res){
        const {email, password} = req.body
        const user = await User.findOne({email: email})
        if (!user) {
            return res.status(400).json({message: "You didn't input password or email!!!! right  "})

        }
        let equalPasswords = bcrypt.compareSync(password, user.password)
        if (!equalPasswords) {
            return res.status(400).json({message: "You didn't input password!!! or email right  "})
        }
        const token = genJWT(user._id, user.email, user.role)
        return res.json({token})
    }


    async verify(req, res, next) {
        const token = genJWT(req.user._id, req.user.email, req.user.role)
        return res.json({token})
    }




}
module.exports = new AuthController()