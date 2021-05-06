exports.show_landing_page = (req, res) => {
  res.render('user/landing_page', {
    'title': 'WPD2 Exercise Planner'
  })
}

exports.show_login_view = (req, res) => {
  res.render('user/login')
}

exports.post_login = (req, res) => res.redirect('/goals/')

exports.show_register_view = (req, res) => {
  res.render('user/register')
}