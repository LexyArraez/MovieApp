import { useState, useEffect, useRef } from 'react'
import { FilterBar } from '../components/movieHome/FilterBar'
import { CardMovie } from '../components/common/CardMovie'
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
    if (!movie || !movie.id) return false
    if (seenIds.has(movie.id)) {
      return false
    }
    seenIds.add(movie.id)
    return true
  })


  useEffect(() => {
    const currentSentinel = sentinelRef.current
    if (!currentSentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]

        if (target.isIntersecting && hasMore && !loadingMore && !loading && !isSearching) {
          loadMore()
        }
      },
      {
        rootMargin: '200px',
        threshold: 0.0
      }
    )

    observer.observe(currentSentinel)

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel)
      }
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>

          {displayMovies.length === 0 ? (
            <p className="text-neutral-400 text-center py-8">
              {isSearching ? 'No se encontraron películas.' : 'No hay películas disponibles.'}
            </p>
          ) : (
            <>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {displayMovies.map((movie) => (
                  <CardMovie key={movie.id} movie={movie} />
                ))}
              </div>


              {loadingMore && !isSearching && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              )}


             <div ref={sentinelRef} className="h-10 w-full bg-transparent clear-both" />
            </>
          )}
        </>
      )}
    </div>
  )
}


const SkeletonCard = () => (
  <div className="bg-bg-card rounded-xl overflow-hidden animate-pulse">
    <div className="aspect-2/3 bg-neutral-700" />
    <div className="p-3 space-y-2">
      <div className="h-3 bg-neutral-700 rounded w-3/4" />
      <div className="h-3 bg-neutral-700 rounded w-1/2" />
    </div>
  </div>
)