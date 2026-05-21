import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../common/Button';
import { GENRES } from '../../constants/movieHome';

export const FilterBar = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;
        container.scrollBy({ left: direction === 'left' ? -160 : 160, behavior: 'smooth' });
    };

    return (
        <div className="relative w-full py-4">
            <button
                onClick={() => scroll('left')}
                className="md:hidden absolute left-0 inset-y-0 z-10 flex items-center justify-center w-8 bg-linear-to-r from-bg-page to-transparent text-white"
                aria-label="Scroll left"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <div
                ref={scrollRef}
                className="flex flex-row items-center gap-3 overflow-x-auto no-scrollbar w-full scroll-smooth snap-x snap-mandatory md:snap-none px-8 md:px-4"
            >
                {GENRES.map((genre) => (
                    <Button
                        key={genre}
                        variant="filter"
                        isActive={activeFilter === genre}
                        onClick={() => setActiveFilter(genre)}
                        className="whitespace-nowrap shrink-0 snap-start"
                    >
                        {genre}
                    </Button>
                ))}
            </div>

            <button
                onClick={() => scroll('right')}
                className="md:hidden absolute right-0 inset-y-0 z-10 flex items-center justify-center w-8 bg-linear-to-l from-bg-page to-transparent text-white"
                aria-label="Scroll right"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};
