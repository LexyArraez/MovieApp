import { Play, Bookmark } from 'lucide-react'
import { Button } from '../common/Button'

export const MovieActions = ({ trailerUrl, onWatchlist }) => {
  return (
    <div className="flex flex-wrap items-center gap-3 px-6 md:px-10 pb-6">

      
      {trailerUrl ? (
        <Button
          variant="primary"
          icon={Play}
          iconPosition="left"
          onClick={() => window.open(trailerUrl, '_blank')}
        >
          Watch Trailer
        </Button>
      ) : (
       
        <Button
          variant="primary"
          icon={Play}
          iconPosition="left"
          className="opacity-40 cursor-not-allowed"
          onClick={() => {}}
        >
          Trailer no disponible
        </Button>
      )}

      <Button
        variant="filter"
        icon={Bookmark}
        iconPosition="left"
        onClick={onWatchlist}
      >
        Watchlist
      </Button>
    </div>
  )
}
