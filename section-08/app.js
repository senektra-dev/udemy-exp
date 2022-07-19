const createError = require('http-errors')
const express = require('express')
const art = require('express-art-template')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')
require('dotenv').config()

const indexRouter = require('./routes/index')
const movieRouter = require('./routes/movie')
const searchRouter = require('./routes/search')

const app = express()

app.use(helmet({
  contentSecurityPolicy: false
}))
app.set('views', path.join(__dirname, 'views'))
app.engine('art', art)
app.set('view engine', 'art')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  if (parseInt(req.query.api_key) !== 123456789) {
    res.status(401).send('Unauthorized')
  } else {
    next()
  }
})

app.use('/', indexRouter)
app.use('/movie', movieRouter)
app.use('/search', searchRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
