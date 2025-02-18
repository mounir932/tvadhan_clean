import { useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';

const AdhanScreen = ({ isPlaying, prayerName, audioRef }) => {
    const [step, setStep] = useState(0);

    const adhanSteps = [
        {
            arabic: "اللهُ أَكْبَر، اللهُ أَكْبَر",
            transliteration: "Allahu Akbar, Allahu Akbar",
            french: "Allah est le plus grand, Allah est le plus grand",
            repeat: 2,
            timings: [
                { start: 0, end: 10 },
                { start: 15, end: 25 }
            ]
        },
        {
            arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا الله",
            transliteration: "Ash-hadu an la ilaha illa Allah",
            french: "J'atteste qu'il n'y a de divinité qu'Allah",
            repeat: 2,
            timings: [
                { start: 29, end: 41 },
                { start: 45, end: 62 }
            ]
        },
        {
            arabic: "أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ الله",
            transliteration: "Ash-hadu anna Muhammadan rasulu Allah",
            french: "J'atteste que Muhammad est le Messager d'Allah",
            repeat: 2,
            timings: [
                { start: 64, end: 79 },
                { start: 84, end: 100 }
            ]
        },
        {
            arabic: "حَيَّ عَلَى الصَّلَاة",
            transliteration: "Hayya 'ala as-Salah",
            french: "Venez à la prière",
            repeat: 2,
            timings: [
                { start: 104, end: 115 },
                { start: 122, end: 136 }
            ]
        },
        {
            arabic: "حَيَّ عَلَى الْفَلَاح",
            transliteration: "Hayya 'ala al-Falah",
            french: "Venez au succès",
            repeat: 2,
            timings: [
                { start: 143, end: 153 },
                { start: 159, end: 176 }
            ]
        },
        {
            arabic: "اللهُ أَكْبَر، اللهُ أَكْبَر",
            transliteration: "Allahu Akbar, Allahu Akbar",
            french: "Allah est le plus grand, Allah est le plus grand",
            repeat: 1,
            timings: [
                { start: 181, end: 188 }
            ]
        },
        {
            arabic: "لَا إِلَهَ إِلَّا الله",
            transliteration: "La ilaha illa Allah",
            french: "Il n'y a de divinité qu'Allah",
            repeat: 1,
            timings: [
                { start: 190, end: 204 }
            ]
        }
    ];

    const duaaAfterAdhan = {
        arabic: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ",
        transliteration: "Allahumma Rabba hadhihi da'watit tammah, was-salatil qa'imah, ati Muhammadanil wasilata wal fadilah, wab'athu maqamam mahmudan alladhi wa'adtahu",
        french: "Ô Allah, Seigneur de cet appel parfait et de la prière établie, accorde à Muhammad le moyen et l'excellence, et ressuscite-le dans la position louable que Tu lui as promise"
    };

    const updateStep = useCallback(() => {
        if (!audioRef.current) return;
        
        const currentTime = audioRef.current.currentTime;
        const currentStep = adhanSteps.findIndex(step => {
            return step.timings.some(timing => 
                currentTime >= timing.start && currentTime <= timing.end
            );
        });

        if (currentStep !== -1 && currentStep !== step) {
            setStep(currentStep);
            // Animation de transition
            gsap.fromTo(".adhan-text", {
                opacity: 0,
                y: 50,
                scale: 0.95
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out"
            });
        }
    }, [step, audioRef]);

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            // Mettre à jour toutes les 100ms pour une synchronisation précise
            const interval = setInterval(updateStep, 100);
            
            // Écouter les événements de l'audio
            audioRef.current.addEventListener('play', updateStep);
            audioRef.current.addEventListener('seeking', updateStep);
            
            return () => {
                clearInterval(interval);
                if (audioRef.current) {
                    audioRef.current.removeEventListener('play', updateStep);
                    audioRef.current.removeEventListener('seeking', updateStep);
                }
            };
        }
    }, [isPlaying, updateStep, audioRef]);

    useEffect(() => {
        if (isPlaying) {
            // Animation d'entrée
            gsap.fromTo(".adhan-text", {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.3
            });
        }
    }, [isPlaying, step]);

    return (
        <div className={`fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center ${
            isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
            <h2 className="text-6xl text-white mb-16 font-bold">
                {prayerName === 'fajr' ? 'Adhan Al-Fajr' : 'Adhan'}
            </h2>
            
            <div className="space-y-12 max-w-[90vw] w-full px-8">
                <p className="adhan-text text-[8rem] leading-normal text-center text-amber-500 font-arabic" 
                   style={{ 
                       textShadow: '0 0 30px rgba(245, 158, 11, 0.3)',
                       fontFamily: '"Noto Naskh Arabic", "Traditional Arabic", serif'
                   }}>
                    {adhanSteps[step]?.arabic}
                </p>
                
                <p className="adhan-text text-5xl text-center text-amber-300"
                   style={{ textShadow: '0 0 20px rgba(245, 158, 11, 0.2)' }}>
                    {adhanSteps[step]?.transliteration}
                </p>
                
                <p className="adhan-text text-4xl text-center text-white font-medium">
                    {adhanSteps[step]?.french}
                </p>
                
                {adhanSteps[step]?.repeat > 1 && (
                    <p className="text-2xl text-center text-amber-200/80 mt-8">
                        À répéter {adhanSteps[step].repeat} fois
                    </p>
                )}
            </div>

            {/* Ajout d'un effet de lueur */}
            <div className="absolute inset-0 pointer-events-none"
                 style={{
                     background: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 70%)'
                 }}
            />
        </div>
    );
};

export default AdhanScreen; 