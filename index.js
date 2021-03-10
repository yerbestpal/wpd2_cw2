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
app.use('/', goalRouter)

const PORT = process.env.port || 3000
app.listen(PORT, () => {
  console.log(`Node server started on port ${PORT} - Press ctrl^c to quit.`)
})

//=============================================
// Testing Moment

// const Moment = require('moment')
// // moment.locale('en')
// // const week = moment.utc().isoWeek()
// // console.log(`result: ${week}`)
//
// let m = new Moment()
// // console.log(m.utc().isoWeek())
//
// // m.add(1, 'week')
// // console.log(m.utc().date(Date.UTC(0, 0, undefined, undefined, undefined, undefined, undefined)))
//
// console.log(m.date())
// m.add(28, 'day')
// console.log(m.calendar())  // get current date
//
// console.log(m.utc().isoWeeksInYear())  // all the weeks in the year
// console.log(m.utc().isoWeeks())  // all the weeks so far in the year