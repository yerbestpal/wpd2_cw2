const express = require('express')
const app = express()

const mustache = require('mustache-express')
app.engine('mustache', mustache())
app.set('view engine', 'mustache')

const path = require('path')
const public = path.join(__dirname, 'public')
app.use(express.static(public))

const router = require('./routes/trackerRoutes')
app.use('/', router)

const PORT = process.env.port || 3000
app.listen(PORT, () => {
  console.log(`Node server started on port ${PORT} - Press ctrl^c to quit.`)
})

