import { Star, Clock, Calendar } from 'lucide-react'


export const MovieInfo = ({ genres = [], releaseYear, runtime, rating, voteCount }) => {

  
  const formatRuntime = (minutes) => {
    if (!minutes) return null
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return h > 0 ? `${h}h ${m}m` : `${m}m`
  }

  return (
    <div className="flex flex-wrap items-center gap-3 px-6 md:px-10 py-4">

   
      {genres.map((genre) => (
        <span
          key={genre.id}
          className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700"
        >
          {genre.name}
        </span>
      ))}

      
      {genres.length > 0 && <div className="w-px h-4 bg-neutral-700" />}

      
      {releaseYear && (
        <div className="flex items-center gap-1 text-neutral-400 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{releaseYear}</span>
        </div>
      )}

      {runtime && (
        <div className="flex items-center gap-1 text-neutral-400 text-sm">
          <Clock className="w-4 h-4" />
          <span>{formatRuntime(runtime)}</span>
        </div>
      )}

      
      {rating > 0 && (
        <div className="flex items-center gap-1 text-sm">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-white font-medium">{rating}</span>
          {voteCount > 0 && (
            <span className="text-neutral-500 text-xs">({voteCount.toLocaleString()})</span>
          )}
        </div>
      )}
    </div>
  )
}
