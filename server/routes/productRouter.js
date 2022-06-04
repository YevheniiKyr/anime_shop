const router = require('express').Router()
const productController = require('../controllers/productController')

router.post('/', productController.create)
router.get('/', productController.getAll)
router.get('/',productController.getByID )
router.put('/',productController.update)
router.delete('/:id', productController.delete)


module.exports = router