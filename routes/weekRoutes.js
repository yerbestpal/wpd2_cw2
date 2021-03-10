const express = require('express')
const controller = require('../controllers/weekController')
const router = express.Router()

router.get('/', controller.get_all_weeks)
// router.get('/week', controller.go_to_current_week)

module.exports = router