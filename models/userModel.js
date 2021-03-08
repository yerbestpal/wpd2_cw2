const moment = require('moment')

class User {
  constructor (forename, surname) {
    this.forename = forename
    this.surname = surname
    this.pastWeeks = moment.utc().isoWeeks()
    this.weeks = []
    this.achievements = []
  }
}