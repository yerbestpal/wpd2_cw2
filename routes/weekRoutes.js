const express = require('express')
const controller = require('../controllers/weekController')
const router = express.Router()

router.get('/', controller.go_to_current_week)
// router.get('/week', controller.go_to_current_week)

module.exports = router