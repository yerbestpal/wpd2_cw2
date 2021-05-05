// const goalDAO = require('../models/goalModel')
// const db = new goalDAO()

exports.show_landing_page = (req, res) => {
  res.render('user/landing_page', {
    'title': 'WPD2 Exercise Planner'
  })
}

exports.show_login_view = (req, res) => {
  res.render('user/login')
}

exports.show_register_view = (req, res) => {
  res.render('user/register')
}