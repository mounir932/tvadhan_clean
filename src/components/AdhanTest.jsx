import { useState, useRef } from 'react';
import AdhanScreen from './AdhanScreen';

const AdhanTest = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.7);
    const [currentPrayer, setCurrentPrayer] = useState('dohr');
    const audioRef = useRef(null);

    const playAdhan = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio('/audio/adhan.mp3');
            audioRef.current.volume = volume;
        }
        
        audioRef.current.play();
        setIsPlaying(true);
        
        audioRef.current.onended = () => {
            setIsPlaying(false);
            audioRef.current = null;
        };
    };

    const stopAdhan = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
            audioRef.current = null;
        }
    };

    return (
        <>
            <div className="fixed top-4 right-4 z-[60] bg-black/80 p-4 rounded-lg">
                <h3 className="text-white mb-2">Test Adhan</h3>
                
                <select 
                    value={currentPrayer}
                    onChange={(e) => setCurrentPrayer(e.target.value)}
                    className="w-full mb-2 p-1 rounded bg-gray-700 text-white"
                >
                    <option value="fajr">Fajr</option>
                    <option value="dohr">Dohr</option>
                    <option value="asr">Asr</option>
                    <option value="maghrib">Maghrib</option>
                    <option value="isha">Isha</option>
                </select>

                <button
                    onClick={isPlaying ? stopAdhan : playAdhan}
                    className={`px-4 py-2 rounded w-full ${
                        isPlaying 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-green-600 hover:bg-green-700'
                    } text-white`}
                >
                    {isPlaying ? 'Arrêter Adhan' : 'Jouer Adhan'}
                </button>

                <div className="mt-2">
                    <label className="text-white text-sm block mb-1">
                        Volume: {Math.round(volume * 100)}%
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => {
                            const newVolume = parseFloat(e.target.value);
                            setVolume(newVolume);
                            if (audioRef.current) {
                                audioRef.current.volume = newVolume;
                            }
                        }}
                        className="w-full"
                    />
                </div>
            </div>

            <AdhanScreen 
                isPlaying={isPlaying} 
                prayerName={currentPrayer}
                audioRef={audioRef}
            />
        </>
    );
};

export default AdhanTest; 