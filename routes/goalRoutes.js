const express = require('express')
const controller = require('../controllers/goalController')
const router = express.Router()

router.get('/', controller.get_all_posts)

router.get('/goals/:user', controller.get_all_user_posts);

router.get('/new', controller.show_new_entry)
router.post('/new', controller.post_new_entry)

module.exports = router