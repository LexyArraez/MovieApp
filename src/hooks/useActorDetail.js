import { useState, useEffect } from 'react'
import { fetchActorById, fetchActorMovies, } from '../api/movies.api.js'


export function useActorDetail(actorId) {
  const [actor, setActor]   = useState(null)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  useEffect(() => {
    if (!actorId) return

    let cancelled = false
    setLoading(true)
    setError(null)
    setActor(null)
    setMovies([])

    Promise.all([
      fetchActorById({ id: actorId }),
      fetchActorMovies({ id: actorId }),
    ])
      .then(([actorData, moviesData]) => {
        if (cancelled) return
        setActor(actorData)
        setMovies(moviesData.results)
      })
      .catch(err => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [actorId])

  return { actor, movies, loading, error }
}
