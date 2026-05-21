import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../common/Button'

export const FilterBar = ({ genres = [], activeGenreId = null, onGenreChange }) => {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    const container = scrollRef.current
    if (!container) return
    container.scrollBy({ left: direction === 'left' ? -160 : 160, behavior: 'smooth' })
  }

  return (
    <div className="relative w-full py-4">
      <button
        onClick={() => scroll('left')}
        className=" absolute left-0 inset-y-0 z-10 flex items-center justify-center w-8 bg-linear-to-r from-bg-page to-transparent text-text-4k"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div
        ref={scrollRef}
        className="flex flex-row items-center gap-5 overflow-x-auto no-scrollbar w-full scroll-smooth snap-x snap-mandatory md:snap-none px-8 md:px-4"
      >
        <Button
          variant="filter"
          isActive={activeGenreId === null}
          onClick={() => onGenreChange(null)}
          className="whitespace-nowrap shrink-0 snap-start"
        >
          All
        </Button>

        {genres.map((genre) => (
          <Button
            key={genre.id}
            variant="filter"
            isActive={activeGenreId === genre.id}
            onClick={() => onGenreChange(genre.id)}
            className="whitespace-nowrap shrink-0 snap-start"
          >
            {genre.name}
          </Button>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className=" absolute right-0 inset-y-0 z-10 flex items-center justify-center w-8 bg-linear-to-l from-bg-page to-transparent text-text-4k"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
