import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { getPrayerTimes, convertTimeToMinutes } from '../utils/prayerTimes';

const AnimatedBackground = ({ prayerTimes, countdown }) => {
    const bgRef = useRef(null);
    const starsContainerRef = useRef(null);
    const moonRef = useRef(null);
    const mistRef = useRef(null);
    const shootingStarsRef = useRef(null);
    const [gradient, setGradient] = useState('linear-gradient(to bottom, #1a1a2e, #000000)'); // Dégradé par défaut

    // Optimisation de la création des étoiles avec useMemo
    const createStar = useMemo(() => (isShootingStar = false) => {
        const star = document.createElement('div');
        const size = isShootingStar ? '2px' : Math.random() * 2 + 1 + 'px';
        
        if (isShootingStar) {
            star.className = 'shooting-star';
            star.style.cssText = `
                position: absolute;
                width: 100px;
                height: ${size};
                background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
                opacity: 0;
                transform: rotate(-45deg);
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 50}vh;
                box-shadow: 0 0 10px #fff;
            `;
        } else {
            star.className = 'star';
            star.style.cssText = `
                position: absolute;
                width: ${size};
                height: ${size};
                background: #fff;
                border-radius: 50%;
                opacity: 0;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                box-shadow: 0 0 ${size} #fff;
            `;
        }
        return star;
    }, []);

    const animateShootingStar = (star) => {
        const duration = Math.random() * 1 + 0.5;
        const delay = Math.random() * 15;
        
        gsap.to(star, {
            x: '150vw',
            y: '150vh',
            opacity: 1,
            duration: duration,
            delay: delay,
            repeat: -1,
            ease: "none",
            repeatDelay: Math.random() * 20 + 10,
            onRepeat: () => {
                gsap.set(star, {
                    x: '-50px',
                    y: '-50px',
                    left: Math.random() * 100 + 'vw',
                    top: Math.random() * 50 + 'vh'
                });
            }
        });
    };

    const animateStar = (star) => {
        const duration = Math.random() * 2 + 1;
        
        gsap.set(star, { opacity: 0 });
        
        // Animation de scintillement
        gsap.to(star, {
            opacity: Math.random() * 0.8 + 0.2,
            duration: duration,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: Math.random() * 2
        });

        // Animation de pulsation
        gsap.to(star, {
            boxShadow: `0 0 ${parseInt(star.style.width) * 2}px #fff`,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: Math.random() * 2
        });
    };

    // Ajout de l'animation de la lune
    const animateMoon = () => {
        const moon = document.createElement('div');
        moon.className = 'moon';
        moon.style.cssText = `
            position: absolute;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle at 30% 30%, #ffffff, #ffd95b);
            border-radius: 50%;
            box-shadow: 0 0 50px #ffd95b;
            opacity: 0;
            left: calc(80% + 10px);
            top: calc(15% - 15px);
            transform: translate(-50%, -50%);
            filter: blur(1px);
        `;
        moonRef.current.appendChild(moon);

        // Créer les cratères
        for (let i = 0; i < 8; i++) {
            const crater = document.createElement('div');
            crater.style.cssText = `
                position: absolute;
                width: ${Math.random() * 20 + 10}px;
                height: ${Math.random() * 20 + 10}px;
                background: rgba(200, 200, 200, 0.2);
                border-radius: 50%;
                left: ${Math.random() * 60 + 20}%;
                top: ${Math.random() * 60 + 20}%;
                filter: blur(2px);
            `;
            moon.appendChild(crater);
        }

        // Animation de la lune
        gsap.to(moon, {
            opacity: 0.9,
            duration: 2,
            ease: "power2.inOut"
        });

        return moon;
    };

    // Ajout de l'animation de brume
    const createMist = () => {
        const numLayers = 3;
        const layers = [];

        for (let i = 0; i < numLayers; i++) {
            const mist = document.createElement('div');
            mist.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: ${150 + i * 50}px;
                background: linear-gradient(to bottom, 
                    rgba(255,255,255,0) 0%,
                    rgba(255,255,255,0.05) 40%,
                    rgba(255,255,255,0.1) 100%);
                opacity: 0;
                filter: blur(${8 + i * 4}px);
                transform: translateY(100%);
            `;
            mistRef.current.appendChild(mist);
            layers.push(mist);

            // Animation de la brume
            gsap.to(mist, {
                opacity: 0.5,
                y: 0,
                duration: 3 + i,
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true,
                delay: i * 0.5
            });
        }

        return layers;
    };

    // Réduire le nombre d'étoiles et optimiser l'animation
    const createStarShower = () => {
        const numShootingStars = 30; // Réduit de 50 à 25
        const stars = [];

        for (let i = 0; i < numShootingStars; i++) {
            const star = document.createElement('div');
            star.style.cssText = `
                position: absolute;
                width: 2px;
                height: ${Math.random() * 40 + 20}px;
                background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, #ffffff 50%, rgba(255,255,255,0) 100%);
                opacity: 0;
                left: ${Math.random() * 100}vw;
                top: -50px;
                transform: rotate(15deg);
                box-shadow: 0 0 10px #fff;
            `;
            shootingStarsRef.current?.appendChild(star);
            stars.push(star);

            gsap.to(star, {
                y: '120vh',
                opacity: 1,
                duration: Math.random() * 0.8 + 0.3,
                delay: Math.random() * 0.8,
                ease: "none",
                onComplete: () => {
                    star.remove();
                }
            });
        }
    };

    useEffect(() => {
        const stars = [];
        const numStars = 600; // Réduit de 1500 à 800
        const numShootingStars = 5; // Réduit de 8 à 5

        // Création des étoiles en batch pour améliorer les performances
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < numStars; i++) {
            const star = createStar();
            fragment.appendChild(star);
            stars.push(star);
        }
        starsContainerRef.current?.appendChild(fragment);

        // Animation optimisée
        stars.forEach(star => {
            gsap.to(star, {
                opacity: Math.random() * 0.5 + 0.5,
                duration: Math.random() * 3 + 1,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        });

        // Nettoyage optimisé
        return () => {
            gsap.killTweensOf(stars);
            stars.forEach(star => star.remove());
        };
    }, []);

    // Démarrer la pluie d'étoiles filantes périodiquement
    useEffect(() => {
        const interval = setInterval(() => {
            if (starsContainerRef.current?.style.opacity > 0.3) {
                createStarShower();
            }
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const updateBackground = () => {
            if (!prayerTimes) return;

            const times = getPrayerTimes(prayerTimes);
            const now = new Date();
            const currentTime = convertTimeToMinutes(`${now.getHours()}:${now.getMinutes()}`);

            let nextGradient = '';

            // Définition des dégradés pour chaque période
            if (currentTime >= times.fajr && currentTime < times.sunrise) {
                nextGradient = 'linear-gradient(to bottom, #1B1B3A, #614051)';
            } else if (currentTime >= times.sunrise && currentTime < times.dohr) {
                nextGradient = 'linear-gradient(to bottom, #87CEEB, #FFB26B)';
            } else if (currentTime >= times.dohr && currentTime < times.asr) {
                nextGradient = 'linear-gradient(to bottom, #4B9FE1, #1E90FF)';
            } else if (currentTime >= times.asr && currentTime < times.maghrib) {
                nextGradient = 'linear-gradient(to bottom, #4682B4, #FF7F50)';
            } else if (currentTime >= times.maghrib && currentTime < times.isha) {
                nextGradient = 'linear-gradient(to bottom, #4A266A, #CD853F)';
            } else {
                nextGradient = 'linear-gradient(to bottom, #1a1a2e, #000000)';
            }

            // Animation de la transition de couleur
            gsap.to(bgRef.current.style, {
                background: nextGradient,
                duration: countdown, // Utiliser le compte à rebours pour la durée
                ease: "power2.inOut"
            });
        };

        updateBackground();
        const interval = setInterval(updateBackground, 60000);
        return () => clearInterval(interval);
    }, [prayerTimes, countdown]);

    return (
        <>
            <div 
                ref={bgRef}
                className="absolute inset-0 w-full h-full"
                style={{
                    background: gradient,
                    backgroundSize: "100% 100%",
                    willChange: "background" // Optimisation des performances
                }}
            />
            <div 
                ref={starsContainerRef}
                className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
                style={{ opacity: 1 }}
            />
            <div
                ref={moonRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />
            <div
                ref={mistRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 5 }}
            />
            <div
                ref={shootingStarsRef}
                className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
                style={{ zIndex: 1 }}
            />
        </>
    );
};

export default AnimatedBackground; 