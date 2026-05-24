import { CardMovie } from '../common/CardMovie'

export const MovieGrid = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {movies.map((movie) => (
        <CardMovie key={movie.id} movie={movie} />
      ))}
    </div>
  )
}