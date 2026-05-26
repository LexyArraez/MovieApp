import { MovieLogo } from "../components/common/MovieLogo"
import { HeroBody } from "../components/landing/HeroBody"
import { Button } from "../components/common/Button"
import { ArrowRight, LogIn } from "lucide-react";
import { AuthMenu } from "../components/landing/AuthMenu";
import { FooterLanding } from "../components/layout/FooterLanding";


export const LandingPage = () => {
    return (
        <div className="relative min-h-screen bg-bg-page flex flex-col justify-between overflow-x-hidden font-primary">
            <div className="absolute inset-0 pointer-events-none select-none z-0">
                <img
                    src="/img/screen.png"
                    alt="Cinema Background"
                    className="w-full h-full object-cover opacity-20"
                />
            </div>
            <header className="relative z-10 px-5 py-6 md:px-12">
                <MovieLogo />
            </header>
            <main className="grow flex flex-col justify-center px-6 md:px-50 ">
                <HeroBody />
                <AuthMenu />
            </main>
            <FooterLanding />


        </div>
    )
}