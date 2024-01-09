const knex = require('../database/knex')

class MovieNotesController {
  async create(request, response) {
    const { title, description, rating, movie_tags } = request.body
    const { user_id } = request.params

    const [note_id] = await knex('movie_notes').insert({
      title,
      description,
      rating,
      user_id
    })

    const tagsInsert = movie_tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    })

    await knex('movie_tags').insert(tagsInsert)

    response.json()
  }

  async show(request, response) {
    const { id } = request.params

    const movieNotes = await knex('movie_notes').where({ id }).first()
    const movieTags = await knex('movie_tags')
      .where({ note_id: id })
      .orderBy('name')

    return response.json({
      ...movieNotes,
      movieTags
    })
  }

  async index(request, response) {
    const { title, user_id, movie_tags } = request.query

    let movieNotes

    if (movie_tags) {
      const filterTags = movie_tags.split(',').map(movieTag => movieTag.trim())

      movieNotes = await knex('movie_tags')
        .select(['movieNotes.id', 'movieNotes.title', 'movieNotes.user_id'])
        .where('movieNotes.user_id', user_id)
        .whereLike('movieNotes', `%${title}%`)
        .whereIn('name', filterTags)
        .innerJoin('movie_notes', 'movieNotes.id', 'movie_tags.id')
        .orderBy('movieNotes.title')

      console.log(movieNotes)
    } else {
      movieNotes = await knex('movie_notes')
        .where({ user_id })
        .whereLike('title', `%${title}%`)
        .orderBy('title')
    }

    const userTags = await knex('movie_tags').where({ user_id })

    const movieWithTags = movieNotes.map(movie => {
      const movieTags = userTags.filter(tag => tag.note_id === movie.id)

      return {
        ...movie,
        tags: movieTags
      }
    })

    return response.json(movieWithTags)
  }

  async delete(request, response) {
    const { id } = request.params

    await knex('movie_notes').where({ id }).delete()

    return response.json()
  }
}

module.exports = MovieNotesController
