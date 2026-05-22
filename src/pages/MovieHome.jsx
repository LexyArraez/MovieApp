import { useState, useEffect, useRef } from 'react'
import { FilterBar } from '../components/movieHome/FilterBar'
import { MovieGrid } from '../components/movieHome/MovieGrid'
import { MovieSkeleton } from '../components/movieHome/MovieSkeleton'
import { useMovies } from '../hooks/useMovies'
import { useMovieSearch } from '../hooks/useMovieSearch'
import { useGenres } from '../hooks/useGenres'

export const MovieHome = () => {
  const [activeGenreId, setActiveGenreId] = useState(null)
  const { genres } = useGenres()
  const { movies, loading, loadingMore, error, hasMore, loadMore } = useMovies({ genreId: activeGenreId })
  const { searchResults, isSearching } = useMovieSearch()
  const sentinelRef = useRef(null)

  
  const rawMovies = isSearching ? searchResults : movies

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
        const canLoadMore = target.isIntersecting && hasMore && !loadingMore && !loading && !isSearching

        if (canLoadMore) {
          loadMore()
        }
      },
      { rootMargin: '200px', threshold: 0.0 }
    )

    observer.observe(currentSentinel)
    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel)
    }
  }, [hasMore, loadingMore, loading, isSearching, loadMore])
 

    return (

      <div className="px-4 md:px-8 py-4">
        <FilterBar
          genres={genres}
          activeGenreId={activeGenreId}
          onGenreChange={setActiveGenreId}
        />

        {error && (
          <p className="text-red-400 text-sm text-center py-8">
            Error al cargar películas. Inténtalo de nuevo.
          </p>
        )}

        {loading ? (
          <MovieSkeleton count={12} />
        ) : displayMovies.length === 0 ? (
          <p className="text-neutral-400 text-center py-8">
            {isSearching ? 'No se encontraron películas.' : 'No hay películas disponibles.'}
          </p>
        ) : (
          <MovieGrid movies={displayMovies} />
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


