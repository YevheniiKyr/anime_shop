const router = require('express').Router()

const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const orderRouter = require('./orderRouter')
const authRouter = require('./authRouter')
const recRouter = require('./recRouter')

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/category', categoryRouter)
router.use('/order', orderRouter)
router.use('/auth', authRouter)
router.use('/recommendations', recRouter)

module.exports = router
