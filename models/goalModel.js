const Nedb = require('nedb')

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
        user: 'Bob Cobb',
        content: 'Run 10K',
        isComplete: true
      }
    )
    this.db.insert(
      {
        user: 'Bob Cobb',
        content: '2 hours of yoga',
        isComplete: false
      }
    )
    this.db.insert(
      {
        user: 'Pizza Pam',
        content: 'Eat less than 2500 kcal',
        isComplete: false
      }
    )
    this.db.insert(
      {
        user: 'Pizza Pam',
        content: '50 press-ups',
        isComplete: true
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

  removeEntry (id) {
    this.db.remove({ _id: id }, { multi: false }, (err, numOfDocsRemoved) => {
      err ? console.log(`error deleting goal: ${id}`) : console.log(`${numOfDocsRemoved} Goal removed from db`)
    })
  }

  updateEntry (id, user, content) {
    this.db.update({ _id: id }, { $set: { user: user, content: content } }, (err, numUpdated) => {
      err ? console.log(`error updating goal: ${id}`) : console.log(`${numUpdated} Goal updated in db`)
    })
  }

  updateEntryCompletionStatus (id, status) {
    this.db.update({ _id: id }, { $set: { isComplete: status } }, (err, numUpdated) => {
      err ? console.log(`error updating goal status: ${id}`) : console.log(`${numUpdated} Goal status updated in db`)
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

  getGoalsByUser (user) {
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

  getGoalById (id) {
    return new Promise((resolve, reject) => {
      this.db.findOne({ _id: id }, (err, entry) => {
        if (err) {
          reject(err)
        } else {
          resolve(entry)
          console.log(entry)
        }
      })
    })
  }
}

module.exports = Goal