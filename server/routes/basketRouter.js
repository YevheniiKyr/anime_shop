const router = require('express').Router()
const basketController = require("../controllers/basketController");
const auth = require("../middlewares/authMiddleware")
const checkRole = require("../middlewares/checkRoleMiddleware")
const Roles = require("../consts/roles");

router.put('/', auth,  basketController.update)
router.get('/', auth, basketController.getByUser)
router.post('/',  basketController.create)
router.delete('/:id', checkRole(Roles.Admin),  basketController.delete)

module.exports = router