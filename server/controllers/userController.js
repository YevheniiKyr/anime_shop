const userService = require("../services/userService");

class UserController {

    async getAll(req, res, next) {
        try {
            const users = await userService.getAll()
            res.json(users);
        } catch (e) {
            next(e)
        }
    }

    async getByID(req, res, next) {
        try {
            const {id} = req.params
            const user = await userService.get(id)
            res.json(user);
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            const user = req.user
            const body = req.body;
            console.log("updating")
            const updatedUser = await userService.update(id, body, user)
            res.json(updatedUser);
        } catch (e) {
            console.log(e)
            next(e)
        }
    }


    async delete(req, res, next) {
        try {
            const {id} = req.params
            const user = req.user
            const deletedUser = await userService.delete(id, user);
            res.json(deletedUser);
        } catch (e) {
            next(e)
        }
    }

}


module.exports = new UserController()