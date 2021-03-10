const weekDAO = require('../models/weekModel')
const db = new weekDAO()

db.init()

// This is a temporary function used for prototyping the week view
exports.show_temp_view = (req, res) => {
  db.getAllUsersWeeks().then(listOfAllWeeks => {
    res.render('weeks/allWeeks', {
      'weeks': listOfAllWeeks
    })
    console.log('Promise resolved')
  }).catch(err => {
    console.log('promise rejected', err)
  })
}

exports.go_to_next_week = (req, res) => {
  // if (next week doesn't exist) create new week
  //    add 7 days to moment and set new week/date
  //    clear goals
  // else find week where week number = current + 1
  //    get week/dates
  //    get goals
}

// Still not sure whether or not to have previous (fake) weeks
exports.go_to_previous_week = (req, res) => {
  // if (previous week doesn't exist) redirect to today
  // else find week where week number = current - 1
  //    get week/dates
  //    get goals
}

exports.go_to_current_week = (req, res) => {
  // if (week number is not equal to the current week number) go to current week
  // else do nothing

  db.getCurrentWeek().then(currentWeek => {
    res.render('weeks/week', {
      'weeks': currentWeek
    })
    console.log('Promise resolved: found week matching current week')
  }).catch(err => {
    console.log('promise rejected', err)
  })
}