const { Router } = require('express')

const usersRoutes = require('./user.routes')
const movieRoutes = require('./movieNotes.routes')
const tagsRoutes = require('./movieTags.routes')

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/movienotes', movieRoutes)
routes.use('/movietags', tagsRoutes)

module.exports = routes
