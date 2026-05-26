import { tmdbFetch } from './tmdb.client.js'
import { mapGenre, mapMovie, mapMovieDetail, mapPaginatedMovies, mapCredits, mapActorDetail, mapActorMovies } from '../adapters/movies.adapter.js'

export async function fetchPopularMovies({ page = 1, language = 'es-ES' } = {}) {
  const data = await tmdbFetch('/movie/popular', { page, language })
  return mapPaginatedMovies(data)
}

export async function fetchTrendingMovies({ page = 1, language = 'es-ES' } = {}) {
  const data = await tmdbFetch('/trending/movie/week', { page, language })
  return mapPaginatedMovies(data)
}

export async function fetchMoviesByGenre({ genreId, page = 1, language = 'es-ES' } = {}) {
  const data = await tmdbFetch('/discover/movie', {
    with_genres: genreId,
    page,
    language,
    sort_by: 'popularity.desc',
  })
  return mapPaginatedMovies(data)
}

export async function fetchDiscoverMovies({ genreId = null, minRating = null, trending = false, page = 1, language = 'es-ES' } = {}) {
  if (trending && !genreId && !minRating) {
    return fetchTrendingMovies({ page, language })
  }
  const params = { page, language, sort_by: 'popularity.desc' }
  if (genreId) params.with_genres = genreId
  if (minRating) params['vote_average.gte'] = minRating
  const data = await tmdbFetch('/discover/movie', params)
  return mapPaginatedMovies(data)
}

export async function searchMovies({ query, page = 1, language = 'es-ES' } = {}) {
  if (!query?.trim()) {
    return { results: [], page: 1, totalPages: 0, totalResults: 0, hasNextPage: false }
  }
  const data = await tmdbFetch('/search/movie', { query: query.trim(), page, language })
  return mapPaginatedMovies(data)
}

export async function fetchMovieById({ id, language = 'es-ES' } = {}) {
  const data = await tmdbFetch(`/movie/${id}`, { language })
  return mapMovieDetail(data)
}

export async function fetchMovieCredits({ id, language = 'es-ES' } = {}) {
  const data = await tmdbFetch(`/movie/${id}/credits`, { language })
  return mapCredits(data)
}

export async function fetchGenres({ language = 'es-ES' } = {}) {
  const data = await tmdbFetch('/genre/movie/list', { language })
  return (data.genres ?? []).map(mapGenre)
}

export async function fetchMoviesByCast({ castId, page = 1, language = 'es-ES' } = {}) {
  if (!castId) return { results: [], page: 1, totalPages: 0, totalResults: 0, hasNextPage: false }
  const data = await tmdbFetch('/discover/movie', {
    with_cast: castId,
    page,
    language,
    sort_by: 'popularity.desc',
  })
  return mapPaginatedMovies(data)
}


export async function fetchActorById({ id, language = 'es-ES' } = {}) {
  const data = await tmdbFetch(`/person/${id}`, { language })
  return mapActorDetail(data)
}


export async function fetchActorMovies({ id, language = 'es-ES' } = {}) {
  const data = await tmdbFetch(`/person/${id}/movie_credits`, { language })
  return mapActorMovies(data) 
}
