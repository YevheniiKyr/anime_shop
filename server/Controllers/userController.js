const User = require("../Models/User");
const bcrypt = require("bcrypt");
const {ObjectId} = require("bson");

class UserController {


    async getAll(req, res) {
        try {
            let id = req.query.id
            if (id) {
                let new_id = id.map(_id => new ObjectId(_id))
                const users = await User.find({
                    '_id': {$in: new_id}
                })
                res.json(users);
                return
            }
            const users = await User.find({});
            res.json(users);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getByID(req, res) {
        try {
            const user = await User.findById(req.params.id);
            res.json(user);
        } catch (e) {
            res.status(500).json(e)
        }

    }

    async update(req, res) {
        if (req.body.password) {
            req.body.password = bcrypt.hash(req.body.password, 3)
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true,  runValidators: true}
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    }


    async delete(req, res) {
        try {
            const {id} = req.params
            if (!id) {
                res.status(400).json({message: 'no id'});
            }
            const deletedUser = await User.findByIdAndDelete(id);
            if (deletedUser == null) {
                res.json({message: "Cant find user with this id"})
            } else res.json(deletedUser);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async deleteAll() {
        await User.deleteMany({})
    }
}


module.exports = new UserController()