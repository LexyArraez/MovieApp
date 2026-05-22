const SkeletonCard = () => (
  <div className="bg-bg-card rounded-xl overflow-hidden animate-pulse">
    <div className="aspect-2/3 bg-neutral-700" />
    <div className="p-3 space-y-2">
      <div className="h-3 bg-neutral-700 rounded w-3/4" />
      <div className="h-3 bg-neutral-700 rounded w-1/2" />
    </div>
  </div>
)

export const MovieSkeleton = ({ count = 12 }) => {
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}