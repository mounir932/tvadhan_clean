import { useEffect, useState } from 'react';
import gsap from 'gsap';

const AdhanScreen = ({ isPlaying, audioRef }) => {
    const [currentPhrase, setCurrentPhrase] = useState('');
    const [currentTranslation, setCurrentTranslation] = useState('');
    const [currentPhonetic, setCurrentPhonetic] = useState('');
    console.log("✅ JE SUIS LA.");
    const phrases = {
        'allahuAkbar1': {
            arabic: 'اللهُ أَكْبَر',
            french: "Allah est le plus grand",
            phonetic: "Allahu Akbar",
            timing: [0, 14]
        },
        'allahuAkbar2': {
            arabic: 'اللهُ أَكْبَر',
            french: "Allah est le plus grand",
            phonetic: "Allahu Akbar",
            timing: [15, 25]
        },
        'ashhaduLaIlaha1': {
            arabic: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللهُ',
            french: "Je témoigne qu'il n'y a de dieu qu'Allah",
            phonetic: "Ashhadu La Ilaha",
            timing: [26, 41]
        },
        'ashhaduLaIlaha2': {
            arabic: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللهُ',
            french: "Je témoigne qu'il n'y a de dieu qu'Allah",
            phonetic: "Ashhadu La Ilaha",
            timing: [42, 62]
        },
        'ashhaduMuhammad1': {
            arabic: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللهِ',
            french: "Je témoigne que Muhammad est le messager d'Allah",
            phonetic: "Ashhadu Muhammad",
            timing: [63, 79]
        },
        'ashhaduMuhammad2': {
            arabic: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللهِ',
            french: "Je témoigne que Muhammad est le messager d'Allah",
            phonetic: "Ashhadu Muhammad",
            timing: [81, 100]
        },
        'hayyaAlasSalah1': {
            arabic: 'حَيَّ عَلَى الصَّلَاة',
            french: "Venez à la prière",
            phonetic: "Hayya Alas Salah",
            timing: [101, 115]
        },
        'hayyaAlasSalah2': {
            arabic: 'حَيَّ عَلَى الصَّلَاة',
            french: "Venez à la prière",
            phonetic: "Hayya Alas Salah",
            timing: [117, 136]
        },
        'hayyaAlalFalah1': {
            arabic: 'حَيَّ عَلَى الْفَلَاح',
            french: "Venez au succès",
            phonetic: "Hayya Alal Falah",
            timing: [138, 153]
        },
        'hayyaAlalFalah2': {
            arabic: 'حَيَّ عَلَى الْفَلَاح',
            french: "Venez au succès",
            phonetic: "Hayya Alal Falah",
            timing: [155, 176]
        },
        'allahuAkbarFinal': {
            arabic: 'اللهُ أَكْبَر اللهُ أَكْبَر',
            french: "Allah est le plus grand, Allah est le plus grand",
            phonetic: "Allahu Akbar, Allah Akbar",
            timing: [178, 188]
        },
        'laIlaha': {
            arabic: 'لَا إِلَٰهَ إِلَّا اللهُ',
            french: "Il n'y a de dieu qu'Allah",
            phonetic: "La Ilaha",
            timing: [190, 204]
        }
    };
    
    useEffect(() => {
        if (!isPlaying || !audioRef.current) return;

        

        const checkTime = () => {
            const currentTime = audioRef.current.currentTime;
            
            for (const [key, phrase] of Object.entries(phrases)) {
                if (currentTime >= phrase.timing[0] && currentTime <= phrase.timing[1]) {
                    if (currentPhrase !== phrase.arabic) {
                        setCurrentPhrase(phrase.arabic);
                        setCurrentTranslation(phrase.french);
                        setCurrentPhonetic(phrase.phonetic);
                        // Animation pour chaque nouvelle phrase
                        gsap.fromTo([".adhan-text", ".adhan-translation", ".adhan-phonetic"],
                            {
                                y: 50,
                                opacity: 0
                            },
                            {
                                y: 0,
                                opacity: 1,
                                duration: 0.5,
                                ease: "power3.out",
                                stagger: 0.2
                            }
                        );
                    }
                    return;
                }
            }
            // Si on n'est dans aucun timing, effacer le texte
            if (currentPhrase !== '') {
                setCurrentPhrase('');
                setCurrentTranslation('');
                setCurrentPhonetic('');
            }
        };

        const interval = setInterval(checkTime, 100);
        return () => clearInterval(interval);
    }, [isPlaying, currentPhrase]);

    return (
        <div className={`fixed inset-0 bg-black/95 z-[999] flex flex-col items-center justify-center ${
            isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition-opacity duration-3000`}>
            <div className="space-y-12 max-w-[90vw] w-full px-8">
                <p className="adhan-text text-[15rem] leading-normal text-center text-amber-500 font-arabic" 
                   style={{ 
                       textShadow: '0 0 60px rgba(245, 158, 11, 0.3)',
                       fontFamily: '"Noto Naskh Arabic", "Traditional Arabic", serif'
                   }}>
                    {currentPhrase}
                </p>
                
                <p className="adhan-translation text-[2rem] text-center text-white font-medium">
                    {currentTranslation}
                </p>
                <p className="adhan-phonetic text-[4rem] text-center text-indigo-600 font-medium"
                style={{ 
                       textShadow: '0 0 30px rgba(76, 0, 255, 0.63)',
                       fontFamily: '"Poppins", semi-bold'
                   }}>
                    {currentPhonetic}
                </p>
            </div>

            {/* Effet de lueur */}
            <div className="absolute inset-0 pointer-events-none"
                 style={{
                     background: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
                     filter: 'blur(40px)'
                 }}
            />
        </div>
    );
};

export default AdhanScreen; 