const express = require('express')
const controller = require('../controllers/goalController')
const router = express.Router()

router.get('/', controller.get_all_posts)

router.get('/goals/:user', controller.get_all_user_posts);

router.get('/new', controller.show_new_entry)
router.post('/new', controller.post_new_entry)

router.get('/remove/:_id', controller.remove_entry)

router.get('/update/:_id', controller.show_update_entry)
router.post('/update/:_id', controller.post_update_entry)

router.get('/update-status/:_id', controller.update_entry_status)

module.exports = router