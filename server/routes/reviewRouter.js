const router = require('express').Router()
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware")
const checkRole = require("../middlewares/checkRoleMiddleware")
const Roles = require("../consts/Roles");

router.get('/' ,  reviewController.getAllReviewsAboutProduct)
router.get('/:id' ,  reviewController.getByID)
router.post('/', authMiddleware, reviewController.create)
router.put('/:id', authMiddleware, reviewController.update)
router.delete('/:id', authMiddleware,  reviewController.delete)
router.delete('/', checkRole(Roles.Admin) ,reviewController.deleteAll)

module.exports = router