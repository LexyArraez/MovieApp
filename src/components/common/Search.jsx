import { Search as SearchIcon } from "lucide-react";

export const Search = ({
  value,
  onChange,
  placeholder = "Search...",
  maxWidth = "max-w-md",
  className = "",
}) => {
  return (
    <div className={`relative flex items-center w-full ${maxWidth} ${className}`}>

      <SearchIcon
        className="absolute text-text-4k pointer-events-none w-5 h-5 left-4"
        strokeWidth={2}
        aria-hidden="true"
      />

      <input
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        aria-label={placeholder}
        className={`
          py-3 pl-12 pr-6 text-base rounded-full placeholder:text-neutral-100 bg-bg-card focus:outline-none transition-colors duration-200
          [&::-webkit-search-cancel-button]:appearance-none 
        `}
      />
    </div>
  );
};