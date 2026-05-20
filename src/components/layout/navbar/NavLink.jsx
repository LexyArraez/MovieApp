import { NavLink as RouterLink } from "react-router-dom";


export const NavLink = ({ to, children }) => {
    return (
        <div>
            <RouterLink
                to={to}
                className={({ isActive }) => `
        text-sm font-medium transition-colors duration-200 relative py-2
        ${isActive
                        ? "text-blue-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-500"
                        : "text-text-4k hover:text-text-tv"
                    }
      `}
            >
                {children}
            </RouterLink>
        </div>
    )
}
