const Nedb = require('nedb')
const Moment = require('moment')
const userDAO = require('../models/userModel')
const goalDAO = require('../models/goalModel')

const today = new Moment()
const monday = today.startOf('isoWeek').format('ddd D MMM').toString()
const sunday = today.endOf('isoWeek').format('ddd D MMM').toString()

// TODO: Replace testUser with logged in user
const testUser = new userDAO('Ross', 'McLean')

class Week {
  constructor (user, goals, dbFilePath) {
    this.weekNumber = today.isoWeek()
    this.fromDate = monday
    this.toDate = sunday
    this.user = user
    this.goals = goals

    if (dbFilePath) {
      // Embedded mode
      this.db = new Nedb({ filename: dbFilePath, autoload: true })
      console.log(`DB is connected to: ${dbFilePath}`)
    } else {
      // In-memory mode (restarts every time - useful during development)
      this.db = new Nedb()
      console.log('Successfully connected to DB in in-memory mode')
    }
  }

  // Seed DB
  init () {
    this.db.insert(
      {
        weekNumber: today.utc().isoWeek(),
        fromDate: monday,
        toDate: sunday,
        user: testUser,
        goals: [
          new goalDAO('Run 10K', false),
          new goalDAO('50 press-ups', false),
          new goalDAO('2 hours of yoga', true),
          new goalDAO('Eat 2000 kcal', true)
        ]
      }
    )
    console.log('Week entry for Ross McLean inserted.')
  }

  getAllUsersWeeks (user = testUser) {
    return new Promise((resolve, reject) => {
      this.db.find({ user: user }, (err, entries) => {
        if (err) {
          reject(err)
        } else {
          resolve(entries)
          console.log(entries)
        }
      })
    })
  }

  getCurrentWeek (user = testUser, currentWeek = today.utc().isoWeek()) {
    return new Promise((resolve, reject) => {
      this.db.find({ weekNumber: currentWeek }, (err, entries) => {
        if (err) {
          reject(err)
        } else {
          resolve(entries)
          console.log(entries)
        }
      })
    })
  }
}

module.exports = Week