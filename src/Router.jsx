import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage"
import { MovieHome } from "./pages/MovieHome";
import { AppLayout } from "./pages/AppLayout"; 

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route element={<AppLayout />}>
                    <Route path="/home" element={<MovieHome />} />
                    <Route path="/movie/:id" element={<div>Detalle película</div>} />
                    <Route path="/favorites" element={<div>Favoritos</div>} />
                    <Route path="/search" element={<div>Búsqueda</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
