import { useEffect, useState } from 'react';
import Clock from "./clock";
import DateDisplay from "./DateDisplay";
import QuranVerse from "./QuranVerse";
import Contenersalat from "./Contenersalat";
import PrayerProgress from './PrayerProgress';
import usePrayerTimes from '../hooks/usePrayerTimes';
import AdhanPlayer from './AdhanPlayer';
import AnimatedBackground from './AnimatedBackground';
import AdhanTest from './AdhanTest';

const MainScreen = () => {
    const { prayerTimes, loading, error } = usePrayerTimes();
    const [testProgress, setTestProgress] = useState(0);
    const [testCountdown, setTestCountdown] = useState(null);

    useEffect(() => {
        document.title = 'TV Adhan';
        
        // Suppression de tous les boutons de test existants
        const oldButtons = document.querySelectorAll('.test-button');
        oldButtons.forEach(button => button.remove());
    }, []);

    if (loading || error) {
        return <div className="w-screen h-screen bg-black flex items-center justify-center text-white">
            {loading ? 'Chargement des horaires de prière...' : `Erreur: ${error.message}`}
        </div>;
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black">
            <AnimatedBackground prayerTimes={prayerTimes} />
            
            <div className="relative z-20 w-full h-full grid grid-cols-12 grid-rows-[repeat(36,1fr)]">
                {/* Grille de debug en développement */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="absolute inset-0 grid grid-cols-12 grid-rows-[repeat(36,1fr)] pointer-events-none opacity-50">
                        {Array.from({ length: 432 }).map((_, i) => (
                            <div key={i} className="border-[0.5px] border-white/10" />
                        ))}
                    </div>
                )}

                {/* Horloge */}
                <div className="col-start-4 col-span-6 row-start-2 row-span-3 z-30">
                    <Clock />
                </div>

                {/* Date */}
                <div className="col-start-3 col-span-8 row-start-6 row-span-1 z-30">
                    <DateDisplay />
                </div>

                {/* Verset */}
                <div className="col-start-2 col-span-10 row-start-8 row-span-8 z-30">
                    <QuranVerse />
                </div>
            </div>

            <AdhanPlayer prayerTimes={prayerTimes} className="z-30" />
            <PrayerProgress className="z-30" />
            
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[45%] z-30">
                <Contenersalat />
            </div>

            {/* Composant de test - uniquement en développement */}
            {process.env.NODE_ENV === 'development' && (
                <>
                    <AdhanTest 
                        onUpdateProgress={setTestProgress}
                        onUpdateCountdown={setTestCountdown}
                    />
                    {testCountdown !== null && (
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                    text-8xl text-white z-50 font-digital">
                            {testCountdown}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MainScreen;
