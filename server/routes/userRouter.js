const router = require('express').Router()
const userController = require("../Controllers/userController");
const authMiddleware = require("../Middlewares/authMiddleware")
const checkRole = require("../Middlewares/checkRoleMiddleware")

router.get('/', checkRole('ADMIN'), userController.getAll)
router.get('/:id', authMiddleware, userController.getByID)
router.put('/:id', authMiddleware, userController.update)
router.delete('/:id', checkRole('ADMIN'), userController.delete)
router.delete('/', checkRole('ADMIN'), userController.deleteAll)

module.exports = router