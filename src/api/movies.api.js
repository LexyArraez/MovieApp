import { tmdbFetch } from './tmdb.client.js'
import { mapGenre, mapMovieDetail, mapPaginatedMovies } from '../adapters/movies.adapter.js'

export async function fetchPopularMovies({ page = 1, language = 'en-US' } = {}) {
  const data = await tmdbFetch('/movie/popular', { page, language })
  return mapPaginatedMovies(data)
}

export async function fetchMoviesByGenre({ genreId, page = 1, language = 'en-US' } = {}) {
  const data = await tmdbFetch('/discover/movie', {
    with_genres: genreId,
    page,
    language,
    sort_by: 'popularity.desc',
  })
  return mapPaginatedMovies(data)
}

export async function searchMovies({ query, page = 1, language = 'en-US' } = {}) {
  if (!query?.trim()) {
    return { results: [], page: 1, totalPages: 0, totalResults: 0, hasNextPage: false }
  }
  const data = await tmdbFetch('/search/movie', { query: query.trim(), page, language })
  return mapPaginatedMovies(data)
}

export async function fetchMovieById({ id, language = 'en-US' } = {}) {
  const data = await tmdbFetch(`/movie/${id}`, { language })
  return mapMovieDetail(data)
}

export async function fetchGenres({ language = 'en-US' } = {}) {
  const data = await tmdbFetch('/genre/movie/list', { language })
  return (data.genres ?? []).map(mapGenre)
}
