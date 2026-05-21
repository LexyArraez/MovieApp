import { ItemSidebar } from "./ItemSidebar"
import { footerMenu, menu } from "../../../constants/sidebar"
import { Button } from "../../common/Button"
import { MovieLogo } from "../../common/MovieLogo"

export const Sidebar = () => {
    return (
        <div className="w-64 h-190 bg-bg-page flex flex-col ">
           
            <nav className="flex flex-col gap-5 px-3 mt-4">
                {menu.map((item) => (
                    <ItemSidebar
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        active={item.active}
                    />
                ))}
            </nav>

            <div className="flex-1" />

            <div className="px-3 pb-4 flex flex-col gap-4">
                <Button variant="primary" className="w-full">
                    Upgrade to 4K
                </Button>
                <div className="flex flex-col gap-2">
                    {footerMenu.map((item) => (
                        <ItemSidebar
                            key={item.label}
                            icon={item.icon}
                            label={item.label}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
