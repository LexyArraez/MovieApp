import { User, MapPin, Clapperboard } from 'lucide-react'

export const ActorHeader = ({ name, profileUrl, placeOfBirth, birthday, knownForDepartment }) => {

 
  const formatDate = (dateStr) => {
    if (!dateStr) return null
    return new Date(dateStr).toLocaleDateString('es-ES', {
      year: 'numeric', month: 'long', day: 'numeric',
    })
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 px-6 md:px-10 py-8">

     
      <div className="shrink-0 w-36 h-36 md:w-48 md:h-48 rounded-2xl overflow-hidden bg-neutral-800 flex items-center justify-center">
        {profileUrl ? (
          <img
            src={profileUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="w-16 h-16 text-neutral-600" />
        )}
      </div>

      <div className="flex flex-col justify-center gap-3">
        <h1 className="text-3xl md:text-4xl font-bold text-white">{name}</h1>

        {knownForDepartment && (
          <div className="flex items-center gap-1.5 text-neutral-400 text-sm">
            <Clapperboard className="w-4 h-4" />
            <span>{knownForDepartment}</span>
          </div>
        )}

        {placeOfBirth && (
          <div className="flex items-center gap-1.5 text-neutral-400 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{placeOfBirth}</span>
          </div>
        )}

        {birthday && (
          <p className="text-neutral-500 text-sm">{formatDate(birthday)}</p>
        )}
      </div>
    </div>
  )
}
