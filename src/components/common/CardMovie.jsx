import { Link } from 'react-router-dom'
import { Star, Film } from 'lucide-react'

export const CardMovie = ({ movie }) => {
  
  const { id, title, posterUrl, backdropUrl, releaseYear, rating } = movie

  return (
    
    <Link to={`/movie/${id}`} className="block group bg-bg-card rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200">
      
      <div className="aspect-2/3 w-full overflow-hidden bg-neutral-800">
        {posterUrl || backdropUrl ? (
          <img
            src={posterUrl ?? backdropUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-neutral-600">
            <Film className="w-10 h-10" />
            <span className="text-xs text-center px-2 line-clamp-2">{title}</span>
          </div>
        )}
      </div>

      <div className="p-3">
        <p className="text-neutral-0 text-sm font-medium line-clamp-2 leading-snug">{title}</p>
        <div className="flex items-center justify-between mt-1.5">
          {releaseYear && (
            <span className="text-neutral-100 text-xs">{releaseYear}</span>
          )}
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-neutral-100 text-xs">{rating}</span>
          </div>
        </div>
      </div>

    </Link> 
  )
}