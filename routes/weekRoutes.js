const express = require('express')
const controller = require('../controllers/weekControllers')
const router = express.Router()

router.get('/', controller.show_temp_view)

module.exports = router