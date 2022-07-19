const express = require('express')
const router = express.Router()

const movies = require('../data/movies')

function requireJSON (req, res, next) {
  if (!req.is('application/json')) {
    res.status(400).send('Bad Request')
  } else {
    next()
  }
}

router.param('movieId', (req, res, next) => {
  next()
})

router.get('/top_rated', (req, res) => {
  const pageIndex = ((req.query.page || 1) - 1) * 20
  const results = movies
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(pageIndex, pageIndex + 20)
  res.json({ page: req.query.page, results })
})

router.get('/:movieId', (req, res) => {
  const movieId = req.params.movieId
  const results = movies.find(movie => movie.id === Number(movieId))
  res.json({ movieId, results })
})

router.post('/:movieId/rating', requireJSON, (req, res) => {
  const movieId = req.params.movieId
  const userRating = req.body.value

  if (userRating < 0.5 || userRating > 10) {
    res.status(400).send('Bad Request: Rating must be between 0.5 and 10')
  } else {
    const results = movies.find(movie => movie.id === Number(movieId))
    results.vote_average = userRating
    res.json({ movieId, results })
  }
})

router.delete('/:movieId/rating', requireJSON, (req, res) => {
  res.json({ msg: 'Rating deleted' })
})

module.exports = router
