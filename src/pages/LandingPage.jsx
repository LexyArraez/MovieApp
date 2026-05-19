import { MovieLogo } from "../components/common/MovieLogo"
import { HeroBody } from "../components/landing/HeroBody"

export const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col overflow-hidden">
            <MovieLogo />
            <div className="flex flex-col pt-30 md:pt-20 px-10 md:px-12">
                <HeroBody />
            </div>
        </div>
    )
}