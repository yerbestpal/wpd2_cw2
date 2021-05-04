const express = require('express')
const controller = require('../controllers/userController')
const router = express.Router()

router.get('/register', controller.show_register_view)

router.get('/login', controller.show_login_view)

module.exports = router