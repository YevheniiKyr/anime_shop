const router = require('express').Router()
const reviewController = require("../Controllers/reviewController");
const authMiddleware = require("../Middlewares/authMiddleware")
const checkRole = require("../Middlewares/checkRoleMiddleware")

router.get('/' ,  reviewController.getAllReviewsAboutProduct)
router.get('/:id' ,  reviewController.getByID)
router.post('/', authMiddleware, reviewController.create)
router.put('/:id', authMiddleware, reviewController.update)
router.delete('/:id', authMiddleware,  reviewController.delete)
router.delete('/', checkRole('ADMIN') ,reviewController.deleteAll)

module.exports = router