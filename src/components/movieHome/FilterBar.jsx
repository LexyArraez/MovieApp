import { useRef } from 'react'
import { ChevronLeft, ChevronRight, TrendingUp, X, Star } from 'lucide-react'
import { Button } from '../common/Button'
import { RATING_OPTIONS } from '../../constants/filters'


export const FilterBar = ({
  genres = [],
  activeGenreId = null,
  onGenreChange,
  minRating = null,
  onRatingChange,
  trending = false,
  onTrendingChange,
  activeGenreName = null,
  onClearAll,
}) => {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    const container = scrollRef.current
    if (!container) return
    container.scrollBy({ left: direction === 'left' ? -160 : 160, behavior: 'smooth' })
  }

  const activeFilters = []
  if (activeGenreName) activeFilters.push({ label: activeGenreName, onRemove: () => onGenreChange(null) })
  if (minRating) activeFilters.push({ label: `${minRating}+`, icon: Star, onRemove: () => onRatingChange(null) })
  if (trending) activeFilters.push({ label: 'Tendencia', onRemove: () => onTrendingChange(false) })

  return (
    <div className="w-full py-4 flex flex-col gap-3">

      <div className="relative w-full">
        <Button
          variant="text"
          onClick={() => scroll('left')}
          className="absolute left-0 inset-y-0 z-10 flex items-center justify-center w-15 bg-linear-to-r from-bg-page to-transparent text-text-4k"
          aria-label="Scroll left"
          icon={ChevronLeft}
        />

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
            Todos
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

        <Button
          variant="text"
          onClick={() => scroll('right')}
          className="absolute right-0 inset-y-0 z-10 flex items-center justify-center w-15 bg-linear-to-l from-bg-page to-transparent text-text-4k"
          aria-label="Scroll right"
          icon={ChevronRight}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 px-1">

        {RATING_OPTIONS.map((option) => (
          <Button
            key={option.label}
            variant="filter"
            isActive={minRating === option.value}
            onClick={() => onRatingChange(option.value)}
            icon={option.icon}
            iconPosition="left"
            className="whitespace-nowrap shrink-0 "
          >
            {option.label}
          </Button>
        ))}

        <div className="w-px h-5 bg-neutral-700 mx-1" />

        <Button
          variant="filter"
          isActive={trending}
          icon={TrendingUp}
          onClick={() => onTrendingChange(!trending)}
          className="whitespace-nowrap shrink-0"
        >
          Tendencia
        </Button>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 px-1 ">
          {activeFilters.map((filter) => (
            <Button
              key={filter.label}
              variant="filter"
              isActive={true}
              icon={X}
              onClick={filter.onRemove}
              aria-label={`Quitar filtro ${filter.label}`}
            >
              {filter.label}
            </Button>
          ))}

          {activeFilters.length > 1 && (
            <Button
              variant="text"
              onClick={onClearAll}
              className="text-sm text-text-4k hover:text-white underline underline-offset-2"
            >
              Limpiar todo
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
