const moment = require('moment')
const Nedb = require('nedb')

class User {
  constructor (forename, surname) {
    this.forename = forename
    this.surname = surname
  }
}

module.exports = User