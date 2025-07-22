const router = require('express').Router()
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware")
const checkRole = require("../middlewares/checkRoleMiddleware")
const Roles = require("../consts/Roles");

router.get('/', checkRole(Roles.Admin), userController.getAll)
router.get('/:id', authMiddleware, userController.getByID)
router.put('/:id', authMiddleware, userController.update)
router.delete('/:id', checkRole(Roles.Admin), userController.delete)
router.delete('/', checkRole(Roles.Admin), userController.deleteAll)

module.exports = router