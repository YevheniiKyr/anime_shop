const router = require('express').Router()
const categoryController = require("../controllers/categoryController");
const checkRole = require("../middlewares/checkRoleMiddleware")
const Roles = require("../consts/Roles");

router.get('/' , categoryController.getAll)
router.post('/' , checkRole(Roles.Admin), categoryController.create)
router.get('/:id', categoryController.getByID)
router.put('/:id', checkRole(Roles.Admin), categoryController.update)
router.delete('/:id', checkRole(Roles.Admin),  categoryController.delete)

module.exports = router