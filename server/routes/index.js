const router = require('express').Router()

const basketRouter = require('./basketRouter')
const orderRouter = require('./orderRouter')
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const reviewRouter = require('./reviewRouter')

router.use('/basket', basketRouter)
router.use('/order', orderRouter)
router.use('/product', productRouter)
router.use('/user', userRouter)
router.use('/review', reviewRouter)

module.exports = router