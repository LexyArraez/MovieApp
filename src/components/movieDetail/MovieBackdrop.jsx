import { Film } from 'lucide-react'


export const MovieBackdrop = ({ title, tagline, backdropUrl }) => {
  return (
    <div className="relative w-full aspect-video max-h-100 overflow-hidden bg-neutral-900">

     
      {backdropUrl ? (
        <img
          src={backdropUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      ) : (
      
        <div className="w-full h-full flex items-center justify-center text-neutral-700">
          <Film className="w-16 h-16" />
        </div>
      )}

     
      <div className="absolute inset-0 bg-gradient-to-t from-bg-page via-bg-page/60 to-transparent" />

     
      <div className="absolute bottom-0 left-0 px-6 pb-6 md:px-10">
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          {title}
        </h1>
        {tagline && (
          <p className="mt-1 text-sm text-neutral-300 italic">{tagline}</p>
        )}
      </div>
    </div>
  )
}
