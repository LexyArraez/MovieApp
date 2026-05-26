import { CastCard} from "./CastCard"


export const MovieCast = ({ cast = [], directors = [] }) => {
  if (cast.length === 0 && directors.length === 0) return null

  return (
    <div className="px-6 md:px-10 py-4">

      {directors.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white mb-3">
            {directors.length > 1 ? 'Directores,Productores' : 'Director'}
          </h2>
          <div className="flex gap-4">
            {directors.map((director) => (
              <CastCard key={director.id} actor={director} />
            ))}
          </div>
        </div>
      )}

    
      {cast.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Elenco</h2>
          
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {cast.map((actor) => (
              <CastCard key={actor.id} actor={actor} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
