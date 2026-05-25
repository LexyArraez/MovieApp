import { useState } from 'react'
import { Button } from '../common/Button'
import { ChevronDown, ChevronUp } from 'lucide-react'

export const ActorBiography = ({ biography }) => {
  const [expanded, setExpanded] = useState(false)

  
  const isLong = biography?.length > 400

  if (!biography) {
    return (
      <div className="px-6 md:px-10 pb-6">
        <h2 className="text-lg font-semibold text-white mb-2">Biografía</h2>
        <p className="text-neutral-500 text-sm italic">
          No hay biografía disponible.
        </p>
      </div>
    )
  }

  return (
    <div className="px-6 md:px-10 pb-6">
      <h2 className="text-lg font-semibold text-white mb-2">Biografía</h2>

      <p className={`text-neutral-300 text-sm leading-relaxed ${!expanded && isLong ? 'line-clamp-4' : ''}`}>
        {biography}
      </p>

      {isLong && (
        <Button
          variant="text"
          icon={expanded ? ChevronUp : ChevronDown}
          onClick={() => setExpanded(prev => !prev)}
          className="mt-2 text-sm text-neutral-400 hover:text-white p-0"
        >
          {expanded ? 'Ver menos' : 'Ver más'}
        </Button>
      )}
    </div>
  )
}
