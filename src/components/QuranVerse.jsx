import { useEffect, useState, useRef } from 'react';
import { getPrayerTimes, convertTimeToMinutes } from '../utils/prayerTimes';
import gsap from 'gsap';
import SplitType from 'split-type';

const verses = [
    {
        arabic: "إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ",
        translation: "Allah et Ses anges prient sur le Prophète"
    },
    {
        arabic: "وَأَقِمِ الصَّلَاةَ لِذِكْرِي",
        translation: "Et accomplis la prière pour te souvenir de Moi"
    },
    {
        arabic: "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا",
        translation: "La prière demeure, pour les croyants, une prescription à des temps déterminés"
    },
    {
        arabic: "حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ",
        translation: "Observez les prières, et la prière médiane"
    },
    {
        arabic: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ",
        translation: "Et cherchez secours dans la patience et la prière"
    }
];

const QuranVerse = ({ prayerTimes }) => {
    const [currentVerse, setCurrentVerse] = useState(verses[0]);
    const [isAnimating, setIsAnimating] = useState(false);
    const arabicRef = useRef(null);
    const translationRef = useRef(null);

    const animateText = () => {
        gsap.fromTo(arabicRef.current,
            {
                opacity: 0,
                scale: 0.8,
                filter: 'blur(10px)'
            },
            {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                duration: 1,
                ease: "power3.out"
            }
        );

        const splitText = new SplitType(translationRef.current, { types: 'chars' });
        gsap.fromTo(splitText.chars,
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                stagger: 0.02,
                duration: 0.5,
                ease: "power2.out",
                delay: 0.5
            }
        );
    };

    const updateVerse = () => {
        if (!prayerTimes) return;

        const times = getPrayerTimes(prayerTimes);
        const now = new Date();
        const currentTime = convertTimeToMinutes(`${now.getHours()}:${now.getMinutes()}`);

        let verseIndex = 0;
        if (currentTime >= times.fajr && currentTime < times.sunrise) {
            verseIndex = 0;
        } else if (currentTime >= times.sunrise && currentTime < times.dohr) {
            verseIndex = 1;
        } else if (currentTime >= times.dohr && currentTime < times.asr) {
            verseIndex = 2;
        } else if (currentTime >= times.asr && currentTime < times.maghrib) {
            verseIndex = 3;
        } else if (currentTime >= times.maghrib && currentTime < times.isha) {
            verseIndex = 4;
        }

        if (currentVerse !== verses[verseIndex] && !isAnimating) {
            setIsAnimating(true);
            gsap.to(".verse-content", {
                opacity: 0,
                y: -20,
                duration: 0.5,
                onComplete: () => {
                    setCurrentVerse(verses[verseIndex]);
                    gsap.to(".verse-content", {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        onComplete: () => {
                            setIsAnimating(false);
                            animateText();
                        }
                    });
                }
            });
        }
    };

    useEffect(() => {
        updateVerse();
        const interval = setInterval(updateVerse, 60000);
        return () => clearInterval(interval);
    }, [prayerTimes]);

    useEffect(() => {
        animateText();
    }, [currentVerse]);

    return (
        <div className="w-full h-full grid place-items-center">
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 backdrop-blur-[40px] rounded-[30px] bg-[#1a1a1a]/50 border-white/10 border shadow-lg"></div>
                <div className="verse-content relative px-8 flex flex-col items-center justify-center gap-8">
                    <span 
                        ref={arabicRef}
                        className="block text-[min(90px)] font-bold text-white tracking-[0.04em] font-poppins text-center"
                        style={{ textShadow: '0 0 20px rgba(255,255,255,0.2)' }}
                    >
                        {currentVerse.arabic}
                    </span>
                    <span 
                        ref={translationRef}
                        className="block text-[min(30px)] text-white/80 tracking-[0.02em] font-poppins text-center"
                    >
                        {currentVerse.translation}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default QuranVerse;
