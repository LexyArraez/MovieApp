import { useState, useEffect } from 'react'
import { fetchMovieById, fetchMovieCredits } from '../api/movies.api.js'


export function useMovieDetail(movieId) {
  const [movie, setMovie]       = useState(null)
  const [credits, setCredits]   = useState({ cast: [], directors: [] })
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    

    if (!movieId) return

    let cancelled = false
    setLoading(true)
    setError(null)
    setMovie(null)
    setCredits({ cast: [], directors: [] })

    
    Promise.all([
      fetchMovieById({ id: movieId }),
      fetchMovieCredits({ id: movieId }),
    ])
      .then(([movieData, creditsData]) => {
        if (cancelled) return
        setMovie(movieData)
        setCredits(creditsData)
      })
      .catch(err => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [movieId])

  return { movie, credits, loading, error }
}
