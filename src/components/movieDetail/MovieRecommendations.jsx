import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { fetchMoviesByCast } from '../../api/movies.api' 
import { CardMovie } from '../common/CardMovie' 
import { Button } from '../common/Button' 

export const MovieRecommendations = ({ cast = [], currentMovieId }) => {

  const [recommendedMovies, setRecommendedMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  
  const moviesPerPage = 5

  useEffect(() => {
    if (!cast || cast.length === 0) return

    setLoading(true)
    const topActors = cast.slice(0, 3)

    Promise.all(
      topActors.map(actor => fetchMoviesByCast({ castId: actor.id }))
    )
      .then((results) => {
        const allMovies = results.flatMap(data => data.results || [])
        const uniqueMovies = [];
        const movieIdsSet = new Set();

        allMovies.forEach(movie => {
          if (movie.id !== Number(currentMovieId) && !movieIdsSet.has(movie.id)) {
            movieIdsSet.add(movie.id);
            uniqueMovies.push(movie);
          }
        });

        setRecommendedMovies(uniqueMovies.slice(0, 15))
        setCurrentPage(0)
      })
      .catch((err) => console.error('Error:', err))
      .finally(() => setLoading(false))
  }, [cast, currentMovieId])

  if (loading || recommendedMovies.length === 0) return null

  const totalPages = Math.ceil(recommendedMovies.length / moviesPerPage)
  const startIndex = currentPage * moviesPerPage
  const visibleMovies = recommendedMovies.slice(startIndex, startIndex + moviesPerPage)

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1)
  }

  return (
    <div className="px-6 md:px-5 py-6">
      
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Recommended For You</h2>
        
        
        <div className="flex items-center gap-2">
          
         
          <Button
            variant="filter"
            icon={ChevronLeft}
            iconPosition="left"
            onClick={prevPage}
            disabled={currentPage === 0}
            className={currentPage === 0 ? 'opacity-30 cursor-not-allowed' : ''}
          />
        
          <Button
            variant="filter"
            icon={ChevronRight}
            iconPosition="right"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className={currentPage === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : ''}
          />
          
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {visibleMovies.map((movie) => (
          <CardMovie key={movie.id} movie={movie} />
        ))}
      </div>

    </div>
  )
}