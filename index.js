const express = require('express')
const path = require('path')
const mustache = require('mustache-express')
const app = express()

app.engine('mustache', mustache())
app.set('view engine', 'mustache')

const public = path.join(__dirname, 'public')
app.use(express.static(public))

const PORT = process.env.port || 3000
app.listen(PORT, () => {
  console.log(`Node server started on port ${PORT} - Press ctrl^c to quit.`)
})

