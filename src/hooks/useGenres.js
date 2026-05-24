import { useState, useEffect } from 'react'
import { fetchGenres } from '../api/movies.api.js'

export function useGenres() {
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetchGenres()
      .then(data => { if (!cancelled) setGenres(data) })
      .catch(err => { if (!cancelled) setError(err) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [])

  return { genres, loading, error }
}
