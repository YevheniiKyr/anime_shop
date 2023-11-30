const router = require('express').Router()
const categoryController = require("../Controllers/categoryController");
const checkRole = require("../Middlewares/checkRoleMiddleware")


router.get('/' , categoryController.getAll)
router.post('/' , checkRole('ADMIN'), categoryController.create)
router.get('/:id', categoryController.getByID)
router.put('/:id', checkRole('ADMIN'), categoryController.update)
router.delete('/:id', checkRole('ADMIN'),  categoryController.delete)

module.exports = router