const express = require('express')
const controller = require('../controllers/userController')
const router = express.Router()

router.get('/', controller.show_landing_page)

router.get('/login', controller.show_login_view)

router.get('/register', controller.show_register_view)

module.exports = router