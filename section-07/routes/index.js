const express = require('express')
const router = express.Router()

const apiKey = process.env.API_KEY || null
const apiBaseUrl = 'http://api.themoviedb.org/3'
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300'

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl
  next()
})

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const response = await fetch(nowPlayingUrl, { method: 'GET' })
    const data = await response.json()
    res.render('index', { movies: data.results })
  } catch (e) {
    console.log(e)
  }
})

router.get('/movie/:id', async (req, res, next) => {
  const movieId = req.params.id
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`

  try {
    const response = await fetch(thisMovieUrl, { method: 'GET' })
    const data = await response.json()
    res.render('single-movie', { data })
  } catch (e) {
    console.log(e)
  }
})

router.post('/search', async (req, res) => {
  const userSearchTerm = encodeURI(req.body.movieSearch)
  const cat = req.body.cat
  const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`

  try {
    const response = await fetch(movieUrl, { method: 'GET' })
    const data = await response.json()
    if (cat === 'person') data.results = data.results[0].known_for
    res.render('index', { movies: data.results })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
