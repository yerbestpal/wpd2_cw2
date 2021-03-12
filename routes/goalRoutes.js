const express = require('express')
const controller = require('../controllers/goalController')
const router = express.Router()

router.get('/', controller.redirect_root_to_current_week)

router.get('/:currentWeek', controller.get_all_goals_by_week_number)

router.get('/:previousWeek', controller.get_all_goals_by_week_number)

router.get('/:nextWeek', controller.get_all_goals_by_week_number)

router.get('/:user', controller.get_all_user_goals);

router.get('/new/:currentWeek', controller.show_new_entry)
router.post('/new/:currentWeek', controller.post_new_entry)

router.get('/remove/:_id', controller.remove_entry)

router.get('/update/:_id', controller.show_update_entry)
router.post('/update/:_id', controller.post_update_entry)

router.get('/update-status/:_id', controller.update_entry_status)

module.exports = router