
export const MovieOverview = ({ overview }) => {
  return (
    <div className="px-6 md:px-10 py-4">
      <h2 className="text-lg font-semibold text-white mb-2">Synopsis</h2>

      {overview ? (
        <p className="text-neutral-300 text-sm leading-relaxed">{overview}</p>
      ) : (
        <p className="text-neutral-500 text-sm italic">
          No hay sinopsis disponible para esta película.
        </p>
      )}
    </div>
  )
}
