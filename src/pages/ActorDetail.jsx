import { useParams, useNavigate } from 'react-router-dom'
import { AlertCircle, RotateCcw, ArrowLeft } from 'lucide-react'
import { useActorDetail } from '../hooks/useActorDetail'
import { ActorHeader } from '../components/actorDetail/ActorHeader'
import { ActorBiography } from '../components/actorDetail/ActorBiography'
import { ActorMovies } from '../components/actorDetail/ActorMovies'
import { Button } from '../components/common/Button'

export const ActorDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { actor, movies, loading, error } = useActorDetail(id)

  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-neutral-500">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <p className="text-sm text-center">No se pudo cargar la información de este actor.</p>
        <Button
          variant="filter"
          icon={RotateCcw}
          iconPosition="left"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </Button>
      </div>
    )
  }

  if (!actor) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-neutral-500">
        <p className="text-sm">Actor no encontrado.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-page">

     
      <div className="px-6 md:px-10 pt-6">
        <Button
          variant="text"
          icon={ArrowLeft}
          iconPosition="left"
          onClick={() => navigate(-1)}
          className='text-text-4k'
        >
          Volver
        </Button>
      </div>

    
      <ActorHeader
        name={actor.name}
        profileUrl={actor.profileUrl}
        placeOfBirth={actor.placeOfBirth}
        birthday={actor.birthday}
        knownForDepartment={actor.knownForDepartment}
      />

      
      <ActorBiography biography={actor.biography} />

     
      <ActorMovies movies={movies} />
    </div>
  )
}
