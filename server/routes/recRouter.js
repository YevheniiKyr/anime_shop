const router = require('express').Router()
const recController = require("../controllers/recommendationsController");
const auth = require("../middlewares/authMiddleware")

router.get('/collaborative_rec', auth, recController.getCollaborative)
router.get('/similar_desc', auth, recController.getByDescription)
router.get('/similar_all', auth, recController.getHybridByAll)

module.exports = router