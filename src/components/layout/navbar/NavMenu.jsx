import { Import } from "lucide-react"
import { links } from "../../../constants/navBar"
import { NavLink } from "./NavLink"  

export const NavMenu = () => {
    return (
        <div>
            <nav className="flex items-center gap-6">
                {links.map((link) => (
                    <NavLink key={link.path} to={link.path}>
                        {link.name}
                    </NavLink>
                ))}
            </nav>
        </div>
    )
}
