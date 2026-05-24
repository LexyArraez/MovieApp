import { useState, useEffect, useRef } from 'react'
import { searchMovies } from '../api/movies.api.js'

export function useMovieSearch(query, { debounceMs = 400 } = {}) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!query?.trim()) {
      setResults([])
      setLoading(false)
      setError(null)
      return
    }

    setLoading(true)
    clearTimeout(timerRef.current)

    timerRef.current = setTimeout(async () => {
      try {
        const data = await searchMovies({ query })
        setResults(data.results)
        setError(null)
      } catch (err) {
        setError(err)
        setResults([])
      } finally {
        setLoading(false)
      }
    }, debounceMs)

    return () => clearTimeout(timerRef.current)
  }, [query, debounceMs])

  return { results, loading, error }
}
