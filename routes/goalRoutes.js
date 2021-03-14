const express = require('express')
const controller = require('../controllers/goalController')
const router = express.Router()

router.get('/', controller.redirect_root_to_current_week)

router.get('/:currentWeek', controller.get_all_goals_by_week_number)

router.get('/:previousWeek', controller.get_all_goals_by_week_number)

router.get('/:nextWeek', controller.get_all_goals_by_week_number)

router.get('/new/:currentWeek', controller.show_new_entry)
router.post('/new/:currentWeek', controller.post_new_entry)

router.get('/:user/:currentWeek', controller.get_all_user_goals_by_week_number)

router.get('/remove/:_id/:currentWeek', controller.remove_entry)

router.get('/update/:_id/:currentWeek', controller.show_update_entry)
router.post('/update/:_id/:currentWeek', controller.post_update_entry)

router.get('/update-status/:_id/:currentWeek', controller.update_entry_status)

router.use((req, res) => {
  res.status(404)
  res.type('text/plain')
  res.send('Error: 404 Not found')
})

router.use((err, req, res, next) => {
  res.status(500)
  res.type('text/plain')
  res.send('Error 500 Internal Server Error')
})

module.exports = router