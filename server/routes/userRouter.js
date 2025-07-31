const router = require('express').Router()
const userController = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware")
const checkRole = require("../middlewares/checkRoleMiddleware")
const Roles = require("../consts/roles");
const basketRouter = require('./basketRouter')

router.get('/', checkRole(Roles.Admin), userController.getAll)
router.get('/:id', auth, userController.getByID)
router.put('/:id', auth, userController.update)
router.delete('/:id', auth, userController.delete)

router.use('/:id/basket', basketRouter)

module.exports = router