import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { fetchMoviesByCast } from '../../api/movies.api' 
import { CardMovie } from '../common/CardMovie' 
import { Button } from '../common/Button' 

export const MovieRecommendations = ({ movies = [], loading }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const moviesPerPage = 5

  if (loading || movies.length === 0) return null

  const totalPages = Math.ceil(movies.length / moviesPerPage)
  const startIndex = currentPage * moviesPerPage
  const visibleMovies = movies.slice(startIndex, startIndex + moviesPerPage)

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1)
  }
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1)
  }

  return (
    <div className="px-6 md:px-5 py-6">
      
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Recomendado Para Ti</h2>
        
        
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