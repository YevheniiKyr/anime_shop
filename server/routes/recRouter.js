const router = require('express').Router()
const recController = require("../Controllers/recommendationsController");
const authMiddleware = require("../Middlewares/authMiddleware")

router.get('/collaborative_rec', authMiddleware, recController.getCollaborative)
router.get('/similar_desc', authMiddleware, recController.getByDescription)
router.get('/similar_all', authMiddleware, recController.getHybridByAll)

module.exports = router