const router = require('express').Router({ mergeParams: true })
const reviewController = require("../controllers/reviewController");
const auth = require("../middlewares/authMiddleware")
const checkRole = require("../middlewares/checkRoleMiddleware")
const Roles = require("../consts/roles");

router.get('/' ,  reviewController.getAllProductReviews)
router.get('/:id' ,  reviewController.getByID)
router.post('/', auth, reviewController.create)
router.put('/:id', auth, reviewController.update)
router.delete('/:id', auth,  reviewController.delete)
router.delete('/', checkRole(Roles.Admin) ,reviewController.deleteProductReviews)

module.exports = router