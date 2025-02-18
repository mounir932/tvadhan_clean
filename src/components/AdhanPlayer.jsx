import { useEffect, useRef } from 'react';

const AdhanPlayer = ({ prayerTimes }) => {
    const audioRef = useRef(new Audio('/audio/adhan.mp3'));
    
    useEffect(() => {
        if (!prayerTimes) return;

        const checkPrayerTime = () => {
            const now = new Date();
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            
            // Vérifier chaque prière
            const prayers = {
                fajr: prayerTimes.fajr,
                dohr: prayerTimes.dohr,
                asr: prayerTimes.asr,
                maghrib: prayerTimes.maghrib,
                isha: prayerTimes.isha
            };

            for (const [prayer, time] of Object.entries(prayers)) {
                if (currentTime === time) {
                    console.log(`C'est l'heure de ${prayer}`);
                    audioRef.current.play();
                    break;
                }
            }
        };

        // Vérifier toutes les minutes
        const interval = setInterval(checkPrayerTime, 60000);
        
        // Vérifier immédiatement au montage
        checkPrayerTime();

        // Configurer l'audio
        audioRef.current.volume = 0.7;

        return () => {
            clearInterval(interval);
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        };
    }, [prayerTimes]);

    // Pas de rendu visuel nécessaire
    return null;
};

export default AdhanPlayer; 