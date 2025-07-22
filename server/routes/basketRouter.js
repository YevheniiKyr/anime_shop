const router = require('express').Router()
const basketController = require("../controllers/basketController");
const authMiddleware = require("../middlewares/authMiddleware")
const checkRole = require("../middlewares/checkRoleMiddleware")
const Roles = require("../consts/Roles");

router.get('/:id', authMiddleware,  basketController.getByID)
router.put('/:id', authMiddleware,  basketController.update)
router.get('/', authMiddleware, basketController.getByUser)
router.post('/',  basketController.create)
router.delete('/:id', checkRole(Roles.Admin),  basketController.delete)

module.exports = router