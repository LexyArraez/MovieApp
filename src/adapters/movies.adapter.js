const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE_URL

export function mapMovie(raw) {
  return {
    id: raw.id,
    title: raw.title ?? raw.name ?? '',
    overview: raw.overview ?? '',
    posterUrl: raw.poster_path ? `${IMAGE_BASE}/w500${raw.poster_path}` : null,
    backdropUrl: raw.backdrop_path ? `${IMAGE_BASE}/w1280${raw.backdrop_path}` : null,
    releaseYear: raw.release_date ? new Date(raw.release_date).getFullYear() : null,
    releaseDate: raw.release_date ?? null,
    rating: raw.vote_average ? Math.round(raw.vote_average * 10) / 10 : 0,
    voteCount: raw.vote_count ?? 0,
    genreIds: raw.genre_ids ?? [],
    popularity: raw.popularity ?? 0,
  }
}

export function mapMovieDetail(raw) {
  return {
    ...mapMovie(raw),
    genres: raw.genres?.map(g => ({ id: g.id, name: g.name })) ?? [],
    runtime: raw.runtime ?? null,
    tagline: raw.tagline ?? '',
    status: raw.status ?? '',
    budget: raw.budget ?? 0,
    revenue: raw.revenue ?? 0,
  }
}

export function mapGenre(raw) {
  return {
    id: raw.id,
    name: raw.name,
  }
}

export function mapPaginatedMovies(raw) {
  return {
    results: (raw.results ?? []).map(mapMovie),
    page: raw.page ?? 1,
    totalPages: raw.total_pages ?? 1,
    totalResults: raw.total_results ?? 0,
    hasNextPage: (raw.page ?? 1) < (raw.total_pages ?? 1),
  }
}
