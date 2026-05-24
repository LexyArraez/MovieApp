import { useState, useEffect, useRef, useContext } from 'react'
import { Film } from 'lucide-react'
import { Button } from '../components/common/Button' 
import { FilterBar } from '../components/movieHome/FilterBar'
import { MovieGrid } from '../components/movieHome/MovieGrid'
import { MovieSkeleton } from '../components/movieHome/MovieSkeleton'
import { useMovies } from '../hooks/useMovies'
import { useMovieSearch } from '../hooks/useMovieSearch'
import { useGenres } from '../hooks/useGenres'
import { SearchContext } from '../hooks/context/SearchContext'

export const MovieHome = () => {
  const [activeGenreId, setActiveGenreId] = useState(null)
  const [minRating, setMinRating] = useState(null)
  const [trending, setTrending] = useState(false)

  const { searchQuery } = useContext(SearchContext)
  const { genres } = useGenres()

  const { movies, loading, loadingMore, error, hasMore, loadMore } = useMovies({
    genreId: activeGenreId,
    minRating,
    trending,
  })

  const { results: searchResults, loading: isSearching } = useMovieSearch(searchQuery)
  const sentinelRef = useRef(null)

  const rawMovies = searchQuery.trim() ? searchResults : movies

  const seenIds = new Set()
  const displayMovies = rawMovies.filter((movie) => {
    if (!movie?.id || seenIds.has(movie.id)) return false
    seenIds.add(movie.id)
    return true
  })

  useEffect(() => {
    const currentSentinel = sentinelRef.current
    if (!currentSentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        const canLoadMore =
          target.isIntersecting &&
          hasMore &&
          !loadingMore &&
          !loading &&
          !isSearching &&
          !searchQuery.trim()

        if (canLoadMore) loadMore()
      },
      { rootMargin: '200px', threshold: 0.0 }
    )

    observer.observe(currentSentinel)
    return () => { if (currentSentinel) observer.unobserve(currentSentinel) }
  }, [hasMore, loadingMore, loading, isSearching, loadMore, searchQuery])


  const activeGenreName = genres.find((g) => g.id === activeGenreId)?.name ?? null

  const handleClearAll = () => {
    setActiveGenreId(null)
    setMinRating(null)
    setTrending(false)
  }

  return (
    <div className="px-4 md:px-8 py-4">

      
      <FilterBar
        genres={genres}
        activeGenreId={activeGenreId}
        onGenreChange={setActiveGenreId}
        minRating={minRating}
        onRatingChange={setMinRating}
        trending={trending}
        onTrendingChange={setTrending}
        activeGenreName={activeGenreName}
        onClearAll={handleClearAll}
      />

      {error && (
        <p className="text-red-400 text-sm text-center py-8">
          Error al cargar películas. Inténtalo de nuevo.
        </p>
      )}

      {loading ? (
        <MovieSkeleton count={12} />
      ) : displayMovies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-neutral-500">
          <Film className="w-10 h-10 text-neutral-600" />
          <p className="text-center">
            {isSearching
              ? 'No se encontraron películas para esa búsqueda.'
              : 'No hay películas que coincidan con los filtros aplicados.'}
          </p>
          {(activeGenreId || minRating || trending) && !isSearching && (
            <Button
              variant="text"
              onClick={handleClearAll}
              className="text-sm underline underline-offset-2"
            >
              Quitar todos los filtros
            </Button>
          )}
        </div>
      ) : (
        <MovieGrid movies={displayMovies} />
      )}

      {searchQuery.trim() && !isSearching && displayMovies.length > 0 && (
        <p className="text-neutral-400 text-center py-8">No hay más resultados</p>
      )}

      {loadingMore && !isSearching && (
        <div className="mt-4">
          <MovieSkeleton count={6} />
        </div>
      )}

      <div
        ref={sentinelRef}
        className="h-4 w-full bg-transparent clear-both block"
        style={{ minHeight: '16px' }}
      />
    </div>
  )
}
