import { Outlet } from "react-router-dom"
import { NavBar } from "../components/layout/navbar/NavBar"
import { FooterLanding } from "../components/layout/FooterLanding"

export const AppLayout = () => {
    return (
        <div className="flex flex-col h-screen w-full bg-bg-page text-white overflow-hidden">
          
            <NavBar />

            <div className="flex flex-1 overflow-hidden">
              
                <div className="flex-1 flex flex-col overflow-auto">
                   
                    <div className="flex-1">
                        <Outlet />
                    </div>
                    <div>
                    
                    <FooterLanding />
                    </div>
                </div>
            </div>
        </div>
    )
}