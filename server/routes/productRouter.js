const router = require('express').Router()
const productController = require("../Controllers/productController");
const checkRole = require("../Middlewares/checkRoleMiddleware")

router.get('/' ,  productController.getAll)
router.get('/:id', productController.getByID)
router.put('/:id', checkRole('ADMIN'), productController.update)
router.delete('/:id', checkRole('ADMIN'), productController.delete)
router.post('/',  checkRole('ADMIN'),  productController.create)

module.exports = router