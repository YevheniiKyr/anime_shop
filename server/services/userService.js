const User = require("../models/user");
const ApiError = require("../exceptions/apiError");
const bcrypt = require("bcrypt");

class UserService {

    async get(id) {
        const user = await User.findById(id);
        if (!user) {
            throw ApiError.NotFoundError(`User not found`)
        }
        return user
    }

    async getAll() {
        const users = await User.find({});
        return users;
    }

    async delete(id, user) {
        if (id !== user._id) {
            throw ApiError.AccessDeniedError()
        }
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            throw ApiError.NotFoundError("User not found")
        }
        return deletedUser;
    }

    async update(id, body, user) {
        if (id !== user._id) {
            throw ApiError.AccessDeniedError()
        }
        if (body.password) {
            body.password = await bcrypt.hash(body.password, 3)
        }
        if (body.role !== user.role) {
            body.role = user.role
        }
        const existingUser = await User.findOne({email: body.email});
        if(existingUser && (existingUser._id !== user._id)) {
            throw ApiError.BadRequestError(`Email is already taken`)
        }
        const updatedUser = await User.findByIdAndUpdate(id, body, {new: true, runValidators: true});
        if (!updatedUser) {
            throw ApiError.NotFoundError("User not found")
        }
        return updatedUser
    }

}

module.exports = new UserService();