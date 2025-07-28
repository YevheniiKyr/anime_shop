const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const ApiError = require("../exceptions/apiError");
const Basket = require("../models/basket");

class AuthService {

     genJWT = (_id, email, role) => {
        return jwt.sign(
            {_id, email, role},
            process.env.SECRET_KEY,
            {expiresIn: '12h'}
        )
    }

    async signIn (email, password) {
        const user = await User.findOne({email: email})
        if (!user) {
            throw ApiError.BadRequestError("Wrong email or password");
        }
        let equalPasswords = bcrypt.compareSync(password, user.password)
        if (!equalPasswords) {
            throw ApiError.BadRequestError("Wrong email or password");
        }
        const token = this.genJWT(user._id, user.email, user.role)
        return token;
    }

    async signUp(email, password, role) {
        if (!email || !password) {
            throw ApiError.BadRequestError("Wrong email or password");
        }
        const existingUser = await User.findOne({
            email: email
        })
        if (existingUser) {
            throw ApiError.BadRequestError("Email is already in use");
        }
        const hashPass = await bcrypt.hash(password, 3)
        const user = await User.create({email: email, password: hashPass, role: role})
        const basket = await Basket.create({user: user._id})
        const token = this.genJWT(user._id, user.email, user.role)

        return token;
    }
}

module.exports = new AuthService()