const Nedb = require('nedb')

class Goal {
  constructor (dbFilePath = "./databases/goals.db") {
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
        user: 'Bob Cobb',
        content: 'Run 10K',
        isComplete: true,
        weekNumber: 10
      }
    )
    this.db.insert(
      {
        user: 'Bob Cobb',
        content: '2 hours of yoga',
        isComplete: false,
        weekNumber: 11
      }
    )
    this.db.insert(
      {
        user: 'Pizza Pam',
        content: 'Eat less than 2500 kcal',
        isComplete: false,
        weekNumber: 12
      }
    )
    this.db.insert(
      {
        user: 'Pizza Pam',
        content: '50 press-ups',
        isComplete: true,
        weekNumber: 13
      }
    )
    console.log('Goal seed data inserted.')
  }

  createEntry (user, content, isComplete, weekNumber) {
    const entry = {
      user: user,
      content: content,
      isComplete: isComplete,
      weekNumber: weekNumber
    }
    this.db.insert(entry, (err, doc) => {
      err ? console.log(`Error inserting document: ${content}`) : console.log(`Successfully inserted document: ${doc}`)
    })
  }

  removeEntry (id) {
    this.db.remove({ _id: id }, { multi: false }, (err, numOfDocsRemoved) => {
      err ? console.log(`Error deleting goal: ${id}`) : console.log(`${numOfDocsRemoved} Goal removed from db`)
    })
  }

  updateEntry (id, user, content) {
    this.db.update({ _id: id }, { $set: { user: user, content: content } }, (err, numUpdated) => {
      err ? console.log(`Error updating goal: ${id}`) : console.log(`${numUpdated} Goal updated in db`)
    })
  }

  updateEntryCompletionStatus (id, status) {
    this.db.update({ _id: id }, { $set: { isComplete: status } }, (err, numUpdated) => {
      err ? console.log(`Error updating goal status: ${id}`) : console.log(`${numUpdated} Goal status updated in db`)
    })
  }

  getAllGoals () {
    return new Promise((resolve, reject) => {
      this.db.find({}).sort({ content: 1 }).exec((err, entries) => {
        err ? reject(err) : resolve(entries)
      })
    })
  }

  getUsersGoalsByWeek (user, week) {
    return new Promise((resolve, reject) => {
      this.db.find({ user: user, weekNumber: week }, (err, entries) => {
        err ? reject(err) : resolve(entries)
      })
    })
  }

  getGoalsByWeekNumber (weekNumber) {
    return new Promise((resolve, reject) => {
      this.db.find({ weekNumber: Number(weekNumber) }, (err, entries) => {
        err ? reject(err) : resolve(entries)
      })
    })
  }

  getGoalById (id) {
    return new Promise((resolve, reject) => {
      this.db.findOne({ _id: id }, (err, entry) => {
        err ? reject(err) : resolve(entry)
      })
    })
  }
}

module.exports = Goal