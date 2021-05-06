const passport = require('passport')
const Strategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const userModel = require('../models/userModel')

exports.init = () => {
  passport.use(new Strategy(
    (username, password, callback) => {
      userModel.lookup(username, (error, user) => {
        if (error) {
          console.log('Error searching for user: ', error)
          return callback(error)
        }
        if (!user) {
          console.log(`${username} not found`)
          return callback(null, false)
        }

        bcrypt.compare(password, user.password,
          (error, result) => result ? callback(null, user) : callback(null, false))
      })
    }
  ))

  passport.serializeUser((user, callback) => callback(null, user.user))

  passport.deserializeUser((id, callback) => {
    userModel.lookup(id, (error, user) => {
      if (error) {
        return callback(error)
      }
      callback(null, user)
    })
  })
}