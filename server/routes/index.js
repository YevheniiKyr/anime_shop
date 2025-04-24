const router = require('express').Router()

const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const basketRouter = require('./basketRouter')
const orderRouter = require('./orderRouter')
const reviewRouter = require('./reviewRouter')
const authRouter = require('./authRouter')
const recRouter = require('./recRouter')

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/category', categoryRouter)
router.use('/basket', basketRouter)
router.use('/order', orderRouter)
router.use('/review', reviewRouter)
router.use('/auth', authRouter)
router.use('/', recRouter)

module.exports = router
