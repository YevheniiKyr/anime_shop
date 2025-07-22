const router = require('express').Router()
const productController = require("../controllers/productController");
const checkRole = require("../middlewares/checkRoleMiddleware")
const Roles = require("../consts/Roles");

router.get('/' ,  productController.getAll)
router.get('/:id', productController.getByID)
router.put('/:id', checkRole(Roles.Admin), productController.update)
router.delete('/:id', checkRole(Roles.Admin), productController.delete)
router.post('/',  checkRole(Roles.Admin),  productController.create)

module.exports = router