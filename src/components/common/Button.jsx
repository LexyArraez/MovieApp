export const Button = ({ children,
  variant = 'primary',
  isActive = false,
  icon: Icon,
  onClick,
  className = '',
  ...props }) => {

  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none";

  const variants = {
    primary: "bg-text-title hover:bg-blue-900 text-white px-15 md:px-6 py-4 rounded-l-xl rounded-r-xl text-base",
    text: " hover:text-gray-500 text-base bg-transparent p-2",
    filter: `px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
      isActive 
        ? "bg-blue-200 text-blue-900" 
        : "bg-neutral-800 text-stone-300 hover:bg-neutral-700" 
    }`
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>


      {Icon && <Icon className="ml-2 w-5 h-5" />}
    </button>
  );

}





