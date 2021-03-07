const Nedb = require('nedb')

class Planner {
  constructor (dbFilePath) {
    if (dbFilePath) {
      // Embedded mode
      this.db = new Nedb({ filename: dbFilePath, autoload: true })
      console.log(`DB is connected to: ${dbFilePath}`)
    } else {
      // In-memory mode (restarts every time - useful during development)
      this.db = new Nedb()
    }
  }


}