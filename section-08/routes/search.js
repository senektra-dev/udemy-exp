const express = require('express')
const router = express.Router()

const movies = require('../data/movies')
const people = require('../data/people')

function queryRequired (req, res, next) {
  const searchTerm = req.query.q
  if (!searchTerm) {
    res.status(400).send('Bad Request: No search term provided')
  } else {
    res.locals.searchTerm = searchTerm
    next()
  }
}

router.use(queryRequired)

router.get('/movie', (req, res) => {
  const results = movies
    .filter(movie => {
      return (
        movie.title.toLowerCase().includes(res.locals.searchTerm.toLowerCase()) ||
        movie.overview.toLowerCase().includes(res.locals.searchTerm.toLowerCase())
      )
    })
  res.json({ results })
})

router.get('/person', (req, res) => {
  const results = people
    .filter(person => person.name.toLowerCase().includes(res.locals.searchTerm.toLowerCase()))
  res.json({ results })
})

module.exports = router
