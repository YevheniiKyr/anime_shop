const router = require('express').Router()


const userController =  require('../controllers/userController')
const {route} = require("express/lib/router");

router.post('/signin', userController.signin)
router.post('/signup', userController.signup)

module.exports = router