import { useState, useEffect } from 'react'  
import { useParams, useNavigate } from 'react-router-dom'
import { AlertCircle, RotateCcw } from 'lucide-react'
import { useMovieDetail } from '../hooks/useMovieDetail'
import { fetchMoviesByCast } from '../api/movies.api'  // añadir
import { MovieBackdrop } from '../components/movieDetail/MovieBackdrop'
import { MovieInfo } from '../components/movieDetail/MovieInfo'
import { MovieActions } from '../components/movieDetail/MovieActions'
import { MovieOverview } from '../components/movieDetail/MovieOverview'
import { MovieCast } from '../components/movieDetail/MovieCast'
import { MovieRecommendations } from '../components/movieDetail/MovieRecommendations'
import { Button } from '../components/common/Button'


export const MovieDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { movie, credits, loading, error } = useMovieDetail(id)

  
  const [recommendedMovies, setRecommendedMovies] = useState([])
  const [loadingRecommendations, setLoadingRecommendations] = useState(true)

  useEffect(() => {
    if (!credits.cast || credits.cast.length === 0) return
    setLoadingRecommendations(true)

    const topActors = credits.cast.slice(0, 3)

    Promise.all(topActors.map(actor => fetchMoviesByCast({ castId: actor.id })))
      .then((results) => {
        const allMovies = results.flatMap(data => data.results || [])
        const unique = []
        const seen = new Set()
        allMovies.forEach(movie => {
          if (movie.id !== Number(id) && !seen.has(movie.id)) {
            seen.add(movie.id)
            unique.push(movie)
          }
        })
        setRecommendedMovies(unique.slice(0, 15))
      })
      .catch(err => console.error('Error:', err))
      .finally(() => setLoadingRecommendations(false))
  }, [credits.cast, id])

  

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-neutral-500">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <p className="text-center text-sm">
          No se pudo cargar la información de esta película.
        </p>
        <Button
          variant="filter"
          icon={RotateCcw}
          iconPosition="left"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </Button>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-neutral-500">
        <p className="text-center">Película no encontrada.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-page">
      <MovieBackdrop
        title={movie.title}
        tagline={movie.tagline}
        backdropUrl={movie.backdropUrl}
        onBack={() => navigate(-1)}
      />

      <div className="md:grid md:grid-cols-[1fr_280px] md:gap-8 md:px-10">

        <div>
          <MovieInfo
            genres={movie.genres}
            releaseYear={movie.releaseYear}
            runtime={movie.runtime}
            rating={movie.rating}
            voteCount={movie.voteCount}
          />

          <MovieActions
            trailerUrl={null}
            onWatchlist={() => { }}
          />

          <MovieOverview overview={movie.overview} />

          <MovieCast
            cast={credits.cast}
            directors={credits.directors}
          />

          <MovieRecommendations
            movies={recommendedMovies}
            loading={loadingRecommendations}
          />
        </div>
         
        </div>
      </div>
    
  )
}