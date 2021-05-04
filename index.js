const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))

const mustache = require('mustache-express')
app.engine('mustache', mustache())
app.set('view engine', 'mustache')

const path = require('path')
const publicDir = path.join(__dirname, 'public')
app.use(express.static(publicDir))

// const weekRouter = require('./routes/weekRoutes')
// app.use('/weeks', weekRouter)

const goalRouter = require('./routes/goalRoutes')
app.use('/goals', goalRouter)

const userRouter = require('./routes/userRoutes')
app.use('/', userRouter)

const PORT = process.env.PORT || 80
app.listen(PORT, () => {
  console.log(`Node server started on port ${PORT} - Press ctrl^c to quit.`)
})