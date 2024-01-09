const { Router } = require('express')

const MovieNotesController = require('../controllers/MovieNotesControllers')
const movieRoutes = Router()

const movieNotesController = new MovieNotesController()

movieRoutes.get('/:id', movieNotesController.show)
movieRoutes.post('/:user_id', movieNotesController.create)
movieRoutes.get('/', movieNotesController.index)
movieRoutes.delete('/:id', movieNotesController.delete)

module.exports = movieRoutes
