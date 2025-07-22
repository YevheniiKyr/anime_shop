const router = require('express').Router()
const orderController = require("../controllers/orderController");

router.get('/' ,  orderController.getAll)
router.get('/:id', orderController.getByID)
router.put('/:id',  orderController.update)
router.delete('/:id', orderController.delete)
router.post('/', orderController.create)

module.exports = router