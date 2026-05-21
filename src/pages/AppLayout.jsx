import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/layout/sidebar/Sidebar"
import { MovieLogo } from "../components/common/MovieLogo"
import { NavBar } from "../components/layout/navbar/NavBar"

export const AppLayout = () => {
    return (
        <div className="flex flex-col h-screen w-full bg-bg-page text-white overflow-hidden">
            <NavBar />

            <div className="hidden md:flex h-full overflow-hidden">
                <Sidebar />
            </div>

            <div className="flex-1  overflow-auto">
                <Outlet />
            </div>
        </div>
    )
}
