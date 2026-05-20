import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/layout/Sidebar"
import { MovieLogo } from "../components/common/MovieLogo"

export const AppLayout = () => {
    return (
        <div className="flex h-screen">
            <div className="md:hidden fixed top-0 w-full z-10 py-2">
                <MovieLogo />
            </div>

            <div className="hidden md:flex">
                <Sidebar />
            </div>

            <div className="flex-1 mt-16 md:mt-0 overflow-auto">
                <Outlet />
            </div>
        </div>
    )
}
