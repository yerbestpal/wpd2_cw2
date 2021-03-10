const Nedb = require('nedb')


class Goal {
  constructor (dbFilePath) {

  }

  createGoal (content, isComplete) {
    const goal = {
      content: content,
      isComplete: isComplete
    }
  }
}

module.exports = Goal