const router = require('express').Router()
const basketController = require("../Controllers/basketController");
const authMiddleware = require("../Middlewares/authMiddleware")
const checkRole = require("../Middlewares/checkRoleMiddleware")

router.get('/:id', authMiddleware,  basketController.getByID)
router.put('/:id', authMiddleware,  basketController.update)
router.get('/', authMiddleware, basketController.getByUser)
router.post('/',  basketController.create)
router.delete('/:id', checkRole('ADMIN'),  basketController.delete)
module.exports = router