const goalDAO = require('../models/goalModel')
const db = new goalDAO()

const Moment = require('moment')
const today = new Moment()
const monday = today.startOf('isoWeek').format('ddd D MMM').toString()
const sunday = today.endOf('isoWeek').format('ddd D MMM').toString()

// Seed DB
db.init()

exports.get_all_posts = (req, res) => {
  db.getAllGoals().then(listOfAllGoals => {
    res.render('goals/entries', {
      'goals': listOfAllGoals,
      'weekNumber': today.isoWeek(),
      'fromDate': monday,
      'toDate': sunday
    })
    console.log('Promise resolved')
  }).catch(err => {
    console.log('promise rejected', err)
  })
}

exports.get_all_user_posts = (req, res) => {
  const user = req.params.user
  db.getGoalsByUser(user).then(listOfAllGoals => {
    res.render('goals/entries', {
      'goals': listOfAllGoals
    })
    console.log('Promise resolved')
  }).catch(err => {
    console.log(`Promise rejected: ${err}`)
  })
}

exports.show_new_entry = function (req, res) {
  res.render('goals/new')
}

exports.post_new_entry = function (req, res) {
  if (!req.body.content) {
    res.status(400).send('Goal must contain content');
    return;
  }

  db.createEntry(req.body.user, req.body.content, false);
  res.redirect('/');
}