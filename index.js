const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))

const mustache = require('mustache-express')
app.engine('mustache', mustache())
app.set('view engine', 'mustache')

const path = require('path')
const publicDir = path.join(__dirname, 'public')
app.use(express.static(publicDir))

const userRouter = require('./routes/userRoutes')
app.use('/', userRouter)

const goalRouter = require('./routes/goalRoutes')
app.use('/goals', goalRouter)

const session = require('express-session')
app.use(session({ secret: 'dont tell anyone', resave: false, saveUninitialized: false }))

const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())

const auth = require('./auth/auth')
auth.init(app)

// const UserDAO = require('./models/userModel')
// UserDAO.init()

const PORT = process.env.PORT || 80
app.listen(PORT, () => console.log(`Node server started on port ${PORT} - Press ctrl^c to quit.`))