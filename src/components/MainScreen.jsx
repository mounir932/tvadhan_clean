import { useEffect, useState } from 'react';
import Clock from "./clock";
import DateDisplay from "./DateDisplay";
import QuranVerse from "./QuranVerse";
import Contenersalat from "./Contenersalat";
import PrayerProgress from './PrayerProgress';
import usePrayerTimes from '../hooks/usePrayerTimes';
import AdhanPlayer from './AdhanPlayer';
import BgFajr from './bgfajr';
import Weather from './Weather';
import Sun from './sun'; // 🌞 Importation du soleil*/
const MainScreen = () => {
    const { prayerTimes, loading, error } = usePrayerTimes();
    const [backgroundType, setBackgroundType] = useState('gsap'); // 'threejs', 'css', ou 'gsap'

    // Fonction pour gérer le rendu de l'arrière-plan
    const renderBackground = () => {
        if (!prayerTimes) {
            console.warn("⏳ Attente du chargement de `prayerTimes`...");
            return null; // 🔥 Ne rien afficher tant que `prayerTimes` est `null`
        }
        console.log("🎨 `BgFajr` va être affiché avec `prayerTimes` :", prayerTimes);
        return <BgFajr />;
    };
    


    useEffect(() => {
        document.title = 'TV Adhan';
        
        // Suppression de tous les boutons de test existants
        const oldButtons = document.querySelectorAll('.test-button');
        oldButtons.forEach(button => button.remove());
    }, []);

    // Affichage en cas de chargement ou d'erreur
    if (loading || error) {
        return (
            <div className="w-screen h-screen bg-black flex items-center justify-center text-white">
                {loading ? 'Chargement des horaires de prière...' : `Erreur: ${error.message}`}
            </div>
        );
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black z-30">
            {/* 🌞 Soleil animé */}
            <div className="absolute w-screen h-screen overflow-hidden bg-black z-01">
             <Sun/>
            </div>

            {/* 🎨 Arrière-plan animé */}
            {renderBackground()}

            {/* 🏠 Contenu principal (horloge, météo, etc.) */}
            <div className="relative z-20 w-full h-full grid grid-cols-12 grid-rows-[repeat(36,1fr)]">
                {/* Météo */}
                <div className="absolute bottom-[45%] left-1/2 -translate-x-1/2 translate-y-[-20px] w-[30%] z-40">
                    <Weather />
                </div>

                {/* Horloge */}
                <div className="col-start-4 col-span-6 row-start-2 row-span-3 z-30">
                    <Clock />
                </div>

                {/* Date */}
                <div className="col-start-2 col-span-10 row-start-6 row-span-1 z-30">
                    <DateDisplay />
                </div>

                {/* Verset du Coran */}
                <div className="col-start-2 col-span-10 row-start-8 row-span-8 z-30">
                    <QuranVerse />
                </div>
            </div>

            {/* 📢 Audio Adhan & Progression */}
            <AdhanPlayer prayerTimes={prayerTimes} className="z-30" />
            <PrayerProgress className="z-30" />
            
            {/* 📆 Affichage des horaires de prière */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[45%] z-20">
                <Contenersalat />
            </div>
        </div>
    );
};

export default MainScreen;
