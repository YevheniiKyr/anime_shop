const router = require('express').Router()
const reviewController = require("../Controllers/reviewController");
const authMiddleware = require("../Middlewares/authMiddleware")
const checkRole = require("../Middlewares/checkRoleMiddleware")

// all reviews about prod by id  (we will use product id and user id inner)
router.get('/' ,  reviewController.getAllReviewsAboutProduct)
// get review by review id
router.get('/:id' ,  reviewController.getByID)
// create review
router.post('/', authMiddleware, reviewController.create)

//update review by id, we need user_id and prod_id
router.put('/:id', authMiddleware, reviewController.update)
router.delete('/:id', authMiddleware,  reviewController.delete)
router.delete('/', checkRole('ADMIN') ,reviewController.deleteAll)
module.exports = router