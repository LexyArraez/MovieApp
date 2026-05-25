import { useParams } from 'react-router-dom'
import { AlertCircle, RotateCcw } from 'lucide-react'
import { useMovieDetail } from '../hooks/useMovieDetail'
import { MovieBackdrop } from '../components/movieDetail/MovieBackdrop'
import { MovieInfo } from '../components/movieDetail/MovieInfo'
import { MovieActions } from '../components/movieDetail/MovieActions'
import { MovieOverview } from '../components/movieDetail/MovieOverview'
import { MovieCast } from '../components/movieDetail/MovieCast'

import { Button } from '../components/common/Button'
import { MovieRecommendations } from '../components/movieDetail/MovieRecommendations' 

export const MovieDetail = () => {
  const { id } = useParams()
  const { movie, credits, loading, error } = useMovieDetail(id)

  

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
            cast={credits.cast} 
            currentMovieId={id} 
          />
        </div>
         
        </div>
      </div>
    
  )
}