import { useState } from "react";
import { Search } from "../../common/Search";
import { NavMenu } from "./NavMenu";
import { UserProfile } from "./UserProfile";
import { Button } from "../../common/Button";
import { Bell, Menu } from "lucide-react";
import { MovieLogo } from "../../common/MovieLogo";

export const NavBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    
    const handleSearchChange = (value) => {
        setSearchQuery(value);
    };

    return (
        <header className="w-full  text-white px-4 md:px-8 py-3 flex items-center justify-between border-b border-white/5 sticky top-0 z-50">
            
        
            <div className="flex items-center gap-2 md:gap-10">
               
                <div className="md:hidden">
                    <Button 
                        variant="text" 
                        icon={Menu} 
                        onClick={() => console.log("Abrir menú")}
                        aria-label="Open menu"
                       
                    />
                </div>

            
                <div className=" items-center gap-2 select-none">
                    <MovieLogo/>
                </div>

                
                <div className="hidden md:block">
                    <NavMenu />
                </div>
            </div>
            
            
            <div className="flex items-center gap-4 flex-1 justify-end max-w-xs md:max-w-md">
                
               
                <div className="hidden md:block ">
                    <Search
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search movies..."
                        maxWidth="max-w-xs"
                    />
                </div>

                
                <div className="hidden md:block">
                    <Button 
                        variant="text" 
                        icon={Bell} 
                        onClick={() => console.log("Notificaciones")}
                        aria-label="Notifications"
                        className="text-text-4k hover:text-text-tv transition-colors duration-200"
                    />
                </div>

            
                <div className="flex">
                    <UserProfile avatarUrl="" onClick={() => console.log("Menu de usuario")} />
                </div>
            </div>

        </header>
    );
};