const router = require('express').Router()
const authController = require("../Controllers/authController");
const authMiddleware = require("../Middlewares/authMiddleware")
const {body} = require('express-validator');


router.post('/signin',  authController.signin)
router.post('/signup',  body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}), authController.signup)
router.get('/check', authMiddleware, authController.verify)


module.exports = router