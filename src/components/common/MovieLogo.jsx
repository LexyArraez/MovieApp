
export const MovieLogo = () => {
  return (
    <div>
      <header className="relative z-10 px-5 py-6 md:px-12 ">
        <div className="flex items-center select-none">
          <img
            src="/img/screen-removebg-preview.png"
            alt="MovieApp Logo"
            className="w-12 h-10 object-contain md:w-20 md:h-20"
          />
          <span className="text-display-xl text-text-title font-bold tracking-tight">MOVIEAPP</span>
        </div>
      </header>
    </div>
  )
}
