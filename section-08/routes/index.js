const express = require('express')
const router = express.Router()

const movies = require('../data/movies')

router.get('/most_popular', (req, res) => {
  const page = req.query.page || 1

  const results = movies
    .filter(movie => movie.most_popular)
    .slice((page - 1) * 20, 19)

  res.json({ page, results })
})

module.exports = router
