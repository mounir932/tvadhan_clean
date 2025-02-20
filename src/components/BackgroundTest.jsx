import { useState } from 'react';
import { getTimeBasedColorCSS } from "../utils/timeBasedColors";
import usePrayerTimes from '../hooks/usePrayerTimes';
import gsap from "gsap";

const BackgroundTest = () => {
    const { prayerTimes } = usePrayerTimes();
    const [currentPrayer, setCurrentPrayer] = useState('fajr');

    const simulateTimeChange = (prayer) => {
        setCurrentPrayer(prayer);
        
        const root = document.documentElement;
        const colors = {
            fajr: {
                from: getTimeBasedColorCSS(prayerTimes, { fajr: '#1B1B3A' }),
                to: getTimeBasedColorCSS(prayerTimes, { fajr: '#2A2A5A' })
            },
            sunrise: {
                from: getTimeBasedColorCSS(prayerTimes, { sunrise: '#87CEEB' }),
                to: getTimeBasedColorCSS(prayerTimes, { sunrise: '#FFA07A' })
            },
            dohr: {
                from: getTimeBasedColorCSS(prayerTimes, { dohr: '#4B9FE1' }),
                to: getTimeBasedColorCSS(prayerTimes, { dohr: '#87CEEB' })
            },
            asr: {
                from: getTimeBasedColorCSS(prayerTimes, { asr: '#4682B4' }),
                to: getTimeBasedColorCSS(prayerTimes, { asr: '#4B9FE1' })
            },
            maghrib: {
                from: getTimeBasedColorCSS(prayerTimes, { maghrib: '#4A266A' }),
                to: getTimeBasedColorCSS(prayerTimes, { maghrib: '#FF6B6B' })
            },
            night: {
                from: getTimeBasedColorCSS(prayerTimes, { night: '#1a1a2e' }),
                to: getTimeBasedColorCSS(prayerTimes, { night: '#16213e' })
            }
        };

        gsap.to(root, {
            '--gradient-from': colors[prayer].from,
            '--gradient-to': colors[prayer].to,
            duration: 2,
            ease: "power1.inOut"
        });
    };

    return (
        <div className="fixed top-4 left-4 z-50 space-y-2 bg-black/50 p-4 rounded-lg backdrop-blur-sm">
            <h2 className="text-white font-bold mb-4">Test des transitions</h2>
            {['fajr', 'sunrise', 'dohr', 'asr', 'maghrib', 'night'].map((prayer) => (
                <button
                    key={prayer}
                    onClick={() => simulateTimeChange(prayer)}
                    className={`block w-full px-4 py-2 rounded text-left ${
                        currentPrayer === prayer ? 'bg-blue-600' : 'bg-blue-400'
                    } text-white hover:bg-blue-500 transition-colors`}
                >
                    {prayer.charAt(0).toUpperCase() + prayer.slice(1)}
                    {prayerTimes && prayerTimes[prayer] && 
                        <span className="float-right">{prayerTimes[prayer]}</span>
                    }
                </button>
            ))}

            <div className="mt-4 text-xs text-white/70">
                Heure actuelle : {new Date().toLocaleTimeString()}
            </div>
        </div>
    );
};

export default BackgroundTest; 