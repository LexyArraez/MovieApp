import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchPopularMovies, fetchMoviesByGenre } from '../api/movies.api.js'

export function useMovies({ genreId = null } = {}) {
  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const cancelledRef = useRef(false)

  const load = useCallback(async (page, reset) => {
    if (page === 1) {
      setLoading(true)
    } else {
      setLoadingMore(true)
    }
    setError(null)

    try {
      const data = genreId
        ? await fetchMoviesByGenre({ genreId, page })
        : await fetchPopularMovies({ page })

      if (cancelledRef.current) return

      setMovies(prev => {
        if (reset) return data.results
        const existingIds = new Set(prev.map(m => m.id))
        return [...prev, ...data.results.filter(m => !existingIds.has(m.id))]
      })
      setCurrentPage(data.page)
      setTotalPages(data.totalPages)
    } catch (err) {
      if (!cancelledRef.current) setError(err)
    } finally {
      if (!cancelledRef.current) {
        setLoading(false)
        setLoadingMore(false)
      }
    }
  }, [genreId])

  useEffect(() => {
    cancelledRef.current = false
    setMovies([])
    setCurrentPage(1)
    setTotalPages(1)
    load(1, true)
    return () => { cancelledRef.current = true }
  }, [genreId])

  const loadMore = useCallback(() => {
    if (!loadingMore && !loading && currentPage < totalPages) {
      load(currentPage + 1, false)
    }
  }, [loadingMore, loading, currentPage, totalPages, load])

  return {
    movies,
    loading,
    loadingMore,
    error,
    hasMore: currentPage < totalPages,
    loadMore,
  }
}
