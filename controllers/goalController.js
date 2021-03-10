const goalDAO = require('../models/goalModel')
const db = new goalDAO()

// Seed DB
// db.init()

exports.get_all_users_posts = (req, res) => {
  db.getAllGoals().then(listOfAllGoals => {
    res.render('goals/entries', {
      'goals': listOfAllGoals
    })
    console.log('Promise resolved')
  }).catch(err => {
    console.log('promise rejected', err)
  })
}

exports.show_new_entry = function (req, res) {
  res.render('goals/new', {
    'title': 'Hello World'
  })
}

exports.post_new_entry = function (req, res) {
  if (!req.body.content) {
    res.status(400).send("Goal must contain content.");
    return;
  }

  db.createEntry(req.body.user, req.body.content, false);
  res.redirect('/');
}