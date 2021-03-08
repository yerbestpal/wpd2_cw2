const Nedb = require('nedb')
const moment = require('moment')
const userDAO = require('../models/userModel')
const goalDAO = require('../models/goalModel')

class Week {
  constructor (number, user, goals, dbFilePath) {
    this.number = number
    this.user = user
    this.goals = goals

    if (dbFilePath) {
      // Embedded mode
      this.db = new Nedb({ filename: dbFilePath, autoload: true })
      console.log(`DB is connected to: ${dbFilePath}`)
    } else {
      // In-memory mode (restarts every time - useful during development)
      this.db = new Nedb()
    }
  }

  // Seed DB
  init () {
    this.db.insert(
      {
        number: moment.utc().isoWeek(),
        user: new userDAO('Ross', 'McLean'),
        goals: [
          new goalDAO('Run 10K', false),
          new goalDAO('50 press-ups', false),
          new goalDAO('2 hours of yoga', true),
          new goalDAO('Eat 2000 kcal', true)
        ]
      }
    )
  }
}

module.exports = Week