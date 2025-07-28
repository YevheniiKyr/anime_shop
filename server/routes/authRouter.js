const router = require('express').Router()
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware")
const {body} = require('express-validator');

router.post('/signin',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    authController.signIn
)
router.post('/signup',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    authController.signup
)
router.post('/check', authMiddleware, authController.verify)

module.exports = router