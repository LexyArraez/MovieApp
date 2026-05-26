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

function mapCastMember(raw) {
  return {
    id: raw.id,
    name: raw.name ?? '',
    character: raw.character ?? '',         
    profileUrl: raw.profile_path
      ? `${IMAGE_BASE}/w185${raw.profile_path}`
      : null,
    order: raw.order ?? 99,                 
  }
}

function mapCrewMember(raw) {
  return {
    id: raw.id,
    name: raw.name ?? '',
    job: raw.job ?? '',                     
    department: raw.department ?? '',
    profileUrl: raw.profile_path
      ? `${IMAGE_BASE}/w185${raw.profile_path}`
      : null,
  }
}
export function mapCredits(raw) {
  const cast = (raw.cast ?? [])
    .sort((a, b) => a.order - b.order)      
    .slice(0, 10)                            
    .map(mapCastMember)
const directors = (raw.crew ?? [])
    .filter(person => person.job === 'Director')
    .map(mapCrewMember)

  return { cast, directors }
}



export function mapActorDetail(raw) {
  return {
    id: raw.id,
    name: raw.name ?? '',
    biography: raw.biography ?? '',
    birthday: raw.birthday ?? null,
    placeOfBirth: raw.place_of_birth ?? null,   
    profileUrl: raw.profile_path
      ? `${IMAGE_BASE}/w500${raw.profile_path}`
      : null,
    popularity: raw.popularity ?? 0,
    knownForDepartment: raw.known_for_department ?? '', 
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
export function mapActorMovies(raw) {
  const results = (raw.cast ?? [])
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
    .slice(0, 15)
    .map(m => mapMovie({ ...m, genre_ids: m.genre_ids ?? [] }))

  return { results }
}