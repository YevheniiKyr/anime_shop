const router = require('express').Router()
const orderController = require("../controllers/orderController");
const auth = require("../middlewares/authMiddleware")
const checkRole = require("../middlewares/checkRoleMiddleware")
const Roles = require("../consts/roles");

router.get('/' , checkRole(Roles.Admin) ,orderController.getAll)
router.get('/:id', auth,orderController.getByID)
router.put('/:id', auth, orderController.update)
router.delete('/:id', auth, orderController.delete)
router.post('/', auth, orderController.create)

module.exports = router