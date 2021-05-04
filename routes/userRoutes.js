const express = require('express')
const controller = require('../controllers/goalController')
const router = express.Router()

router.get('/register', controller.show_register_view)

module.exports = router