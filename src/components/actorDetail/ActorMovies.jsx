import { useState, useEffect } from 'react'
import { CardMovie } from '../common/CardMovie'
import { Film, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../common/Button'

export const ActorMovies = ({ movies = [] }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const moviesPerPage = 5

  useEffect(() => {
    setCurrentPage(0)
  }, [movies])

  if (movies.length === 0) {
    return (
      <div className="px-6 md:px-10 py-4">
        <h2 className="text-lg font-semibold text-white mb-4">Filmografía</h2>
        <div className="flex flex-col items-center justify-center py-12 gap-3 text-neutral-500">
          <Film className="w-10 h-10 text-neutral-700" />
          <p className="text-sm">No hay películas disponibles.</p>
        </div>
      </div>
    )
  }

  const totalPages = Math.ceil(movies.length / moviesPerPage)
  const startIndex = currentPage * moviesPerPage
  const visibleMovies = movies.slice(startIndex, startIndex + moviesPerPage)

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1)
  }

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1)
  }

  return (
    <div className="px-6 md:px-10 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Filmografía</h2>
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
