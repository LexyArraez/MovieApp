import { User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


 export const CastCard = ({ actor }) => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(`/actor/${actor.id}`)}
      className="flex flex-col items-center gap-2 shrink-0 w-20 group"
    >
      
      <div className="w-16 h-16 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center shrink-0">
        {actor.profileUrl ? (
          <img
            src={actor.profileUrl}
            alt={actor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <User className="w-7 h-7 text-neutral-600" />
        )}
      </div>

      <div className="text-center">
        <p className="text-xs text-white font-medium line-clamp-2 leading-tight">
          {actor.name}
        </p>
        <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
          {actor.character}
        </p>
      </div>
    </button>
  )
}
