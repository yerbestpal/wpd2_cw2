exports.connectToDb = (dbFilePath, DAO) => {
  const Nedb = require('nedb')

  if (dbFilePath) {
    // Embedded mode
    DAO.db = new Nedb({ filename: dbFilePath, autoload: true })
    console.log(`DB is connected to: ${dbFilePath}`)
  } else {
    // In-memory mode (restarts every time - useful during development)
    DAO.db = new Nedb()
    console.log('Successfully connected to DB in in-memory mode')
  }
}