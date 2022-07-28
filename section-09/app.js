const createError = require('http-errors')
const express = require('express')
const session = require('express-session')
const art = require('express-art-template')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
require('dotenv').config()

const indexRouter = require('./routes/index')

const app = express()

app.set('env', process.env.ENV)

app.use(helmet({
  contentSecurityPolicy: false
}))

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth'
},
function (accessToken, refreshToken, profile, done) {
  console.log(profile)
  return done(null, profile)
}))

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.set('views', path.join(__dirname, 'views'))
app.engine('art', art)
app.set('view engine', 'art')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = err

  console.log(err)

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
