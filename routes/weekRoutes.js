const express = require('express')
const controller = require('../controllers/weekControllers')
const router = express.Router()

router.get('/', controller.show_temp_view)
router.get('/week', controller.go_to_current_week)

module.exports = router