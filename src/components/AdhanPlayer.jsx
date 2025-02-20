import { useEffect, useRef, useState } from 'react';
import AdhanScreen from './AdhanScreen';

const AdhanPlayer = ({ prayerTimes, className }) => {
    const audioRef = useRef(new Audio('/audio/adhan.mp3'));
    const [isPlaying, setIsPlaying] = useState(false);
    const [showAdhanScreen, setShowAdhanScreen] = useState(false);

    useEffect(() => {
        if (!prayerTimes) return;

        console.log("✅ AdhanPlayer monté : Vérification des horaires en cours...");
        console.log("🔄 Chargement de l'audio Adhan...");
        audioRef.current.oncanplaythrough = () => {
            console.log("🎵 Adhan.mp3 chargé avec succès !");
        };

        const checkAdhanTime = () => {
            const now = new Date();
            const currentTime = now.getHours() * 60 + now.getMinutes();

            const isPrayerTime = Object.entries(prayerTimes)
                .filter(([key]) => key !== "sunrise") // 🔥 Exclure Sunrise
                .some(([_, time]) => {
        const timeInMinutes = typeof time === 'number' ? time :
            time.split(':').reduce((acc, curr) => acc * 60 + parseInt(curr), 0);
        return timeInMinutes === currentTime;
    });


            if (isPrayerTime && !isPlaying) {
                console.log("⏳ Déclenchement prévu dans 7 secondes...");
                setTimeout(() => {
                    console.log("🚀 Lancement de l'Adhan et affichage de l'écran !");
                    setShowAdhanScreen(true);
                    setIsPlaying(true);
                    audioRef.current.play().catch(console.error);
                }, 7000); // ⏳ Délai de 7 secondes
                if (audioRef.current) {
                    audioRef.current.onended = () => {
                        console.log("🎵 Adhan terminé, fermeture de l'écran Adhan.");
                        setShowAdhanScreen(false); // Cacher AdhanScreen après l'Adhan
                        setIsPlaying(false);
                    };
                }   
            }


        };

        const interval = setInterval(checkAdhanTime, 1000);

        return () => clearInterval(interval);
    }, [prayerTimes, isPlaying]);

    return (
        <div className={`fixed inset-0 pointer-events-none ${className}`}>
            {showAdhanScreen && <AdhanScreen isPlaying={isPlaying} audioRef={audioRef} />}
        </div>
    );
};

export default AdhanPlayer;
