const Nedb = require('nedb')
const userDAO = require('../models/userModel')

const testUser = new userDAO('Bob', 'Cobb')

class Goal {
  constructor (dbFilePath) {
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
        user: testUser,
        content: 'Run 10K',
        isComplete: false
      }
    )
    this.db.insert(
      {
        user: testUser,
        content: '2 hours of yoga',
        isComplete: false
      }
    )
    this.db.insert(
      {
        user: testUser,
        content: 'Eat less than 2500 kcal',
        isComplete: false
      }
    )
    this.db.insert(
      {
        user: testUser,
        content: '50 press-ups',
        isComplete: false
      }
    )
    console.log('Goal seed data inserted.')
  }

  createEntry (user, content, isComplete) {
    const entry = {
      user: user,
      content: content,
      isComplete: isComplete
    }
    console.log(`New goal entry created: ${entry}`)

    this.db.insert(entry, (err, doc) => {
      err ? console.log(`Error inserting document: ${content}`) : console.log(`Successfully inserted document: ${doc}`)
    })
  }

  getAllGoals () {
    return new Promise((resolve, reject) => {
      this.db.find({}).sort({ content: 1 }).exec((err, entries) => {
        if (err) {
          reject(err)
        } else {
          resolve(entries)
          console.log(entries)
        }
      })
    })
  }

  getAllUsersGoals (user = testUser) {
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
}

module.exports = Goal