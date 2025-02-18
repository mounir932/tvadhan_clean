import { useEffect, useRef, useState } from 'react';
import { getPrayerTimes, convertTimeToMinutes } from '../utils/prayerTimes';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

const AdhanPlayer = ({ prayerTimes }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showAdhanScreen, setShowAdhanScreen] = useState(false);

    const triggerConfettiAndAdhan = () => {
        // 1. Lancer les confettis d'abord
        const duration = 8 * 1000; // 8 secondes
        const animationEnd = Date.now() + duration;
        const defaults = { 
            startVelocity: 45,
            spread: 360,
            ticks: 100,
            zIndex: 100,
            colors: ['#f6434c', '#602e1f', '#0c2036', '#ffffff', '#ffeb3b', '#ff9800'],
            disableForReducedMotion: true
        };

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                clearInterval(interval);
                // 2. Après les confettis (8 secondes), lancer l'adhan
                if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play()
                        .then(() => {
                            setIsPlaying(true);
                            setShowAdhanScreen(true);
                        })
                        .catch(error => console.error('Erreur lecture audio:', error));
                }
                return;
            }

            const particleCount = 100 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: 0.3, y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: 0.7, y: Math.random() - 0.2 }
            });
        }, 250);
    };

    useEffect(() => {
        const checkPrayerTime = () => {
            if (!prayerTimes) return;

            const times = getPrayerTimes(prayerTimes);
            const now = new Date();
            const currentTime = convertTimeToMinutes(`${now.getHours()}:${now.getMinutes()}`);

            Object.entries(times).forEach(([prayer, time]) => {
                if (currentTime === time) {
                    triggerConfettiAndAdhan();
                    
                    // Masquer l'écran d'adhan après la durée de l'adhan
                    setTimeout(() => {
                        setShowAdhanScreen(false);
                    }, 68000); // 8s (confettis) + 60s (adhan)
                }
            });
        };

        const interval = setInterval(checkPrayerTime, 15000);
        checkPrayerTime();

        return () => clearInterval(interval);
    }, [prayerTimes]);

    const handleAudioEnd = () => {
        setIsPlaying(false);
        setTimeout(() => {
            setShowAdhanScreen(false);
        }, 2000);
    };

    return (
        <>
            <audio 
                ref={audioRef}
                src="/adhan.mp3"
                onEnded={handleAudioEnd}
                preload="auto"
            />
            {showAdhanScreen && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-6xl text-white mb-8 font-arabic">
                            حي على الصلاة
                        </h1>
                        <p className="text-3xl text-white/80">
                            Il est temps de prier
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdhanPlayer; 