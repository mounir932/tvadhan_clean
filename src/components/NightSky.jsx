import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";

const NUM_STARS = 1000; // Plus d'étoiles pour un ciel plus riche
const STAR_LAYERS = 4; // Plus de couches pour plus de profondeur
const SHOOTING_STARS = 5; // Nombre d'étoiles filantes

const NightSky = () => {
    const starsRef = useRef(null);
    const moonRef = useRef(null);
    const shootingStarsRef = useRef(null);
    const cloudsRef = useRef(null);

    // Génération optimisée des étoiles avec useMemo
    const stars = useMemo(() => generateStars(), []);
    const shootingStars = useMemo(() => generateShootingStars(), []);

    useEffect(() => {
        // Animation des étoiles par couche
        document.querySelectorAll('.star-layer').forEach((layer, index) => {
            const stars = layer.querySelectorAll('.star');
            stars.forEach(star => {
                gsap.to(star, {
                    opacity: Math.random() * 0.5 + 0.3,
                    scale: Math.random() * 0.3 + 0.7,
                    duration: 2 + Math.random() * 4,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: Math.random() * 2
                });
            });
        });

        // Animation de la lune
        gsap.to(moonRef.current, {
            y: "-20%",
            duration: 60 * 60, // 1 heure
            ease: "none",
            repeat: -1,
            yoyo: true
        });

        // Animation du halo de la lune
        gsap.to(moonRef.current.querySelector('.moon-glow'), {
            opacity: 0.6,
            scale: 1.2,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Animation des étoiles filantes
        animateShootingStars();

        // Animation des nuages
        animateClouds();
        

    // ✅ Cleanup pour stopper l’animation si le composant est démonté
    return () => {
        starAnimation.kill();
        moonAnimation.kill();
    };

    }, []);

    // Génération des étoiles avec différentes tailles et brillances
    function generateStars() {
        return Array.from({ length: STAR_LAYERS }).map((_, layerIndex) => (
            <div 
                key={layerIndex} 
                className={`star-layer absolute inset-0`} 
                style={{ 
                    zIndex: layerIndex,
                    transform: `translateZ(${layerIndex * 10}px)`
                }}
            >
                {Array.from({ length: NUM_STARS / STAR_LAYERS }).map((_, i) => {
                    const size = Math.random() * (3 - layerIndex * 0.5) + 1;
                    const brightness = Math.random() * 0.5 + 0.5;
                    return (
                        <div
                            key={i}
                            className="star absolute"
                            style={{
                                width: `${size}px`,
                                height: `${size}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                background: `radial-gradient(circle at center, 
                                    rgba(255,255,255,${brightness}), 
                                    rgba(255,255,255,0) 100%)`,
                                boxShadow: `0 0 ${size * 2}px rgba(255,255,255,${brightness * 0.8})`,
                                borderRadius: "50%",
                                filter: `blur(${layerIndex * 0.3}px)`
                            }}
                        />
                    );
                })}
            </div>
        ));
    }

    // Génération des étoiles filantes
    function generateShootingStars() {
        return Array.from({ length: SHOOTING_STARS }).map((_, i) => (
            <div
                key={i}
                className="shooting-star absolute"
                style={{
                    width: "2px",
                    height: "2px",
                    background: "white",
                    borderRadius: "50%",
                    top: "-10%",
                    left: "-10%",
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 0 5px rgba(255,255,255,0.5)"
                }}
            />
        ));
    }

    // Animation des étoiles filantes
    function animateShootingStars() {
        const shootingStars = document.querySelectorAll('.shooting-star');
        shootingStars.forEach(star => {
            gsap.timeline({
                repeat: -1,
                delay: Math.random() * 15
            })
            .set(star, {
                x: Math.random() * window.innerWidth,
                y: -10,
                opacity: 0,
                scale: 0
            })
            .to(star, {
                x: "+=200",
                y: "+=300",
                opacity: 1,
                scale: 1.5,
                duration: 0.6,
                ease: "power1.in"
            })
            .to(star, {
                x: "+=100",
                y: "+=150",
                opacity: 0,
                scale: 0,
                duration: 0.3,
                ease: "power1.out"
            });
        });
    }

    // Animation des nuages
    function animateClouds() {
        const clouds = cloudsRef.current.children;
        Array.from(clouds).forEach(cloud => {
            gsap.to(cloud, {
                x: "+=100%",
                duration: 120 + Math.random() * 60,
                repeat: -1,
                ease: "none",
                delay: -Math.random() * 120
            });
        });
    }

    return (
        <>
            {/* Couches d'étoiles */}
            <div ref={starsRef} className="absolute inset-0 w-full h-full">
                {stars}
            </div>

            {/* Étoiles filantes */}
            <div ref={shootingStarsRef} className="absolute inset-0">
                {shootingStars}
            </div>

            {/* Lune avec halo */}
            <div
                ref={moonRef}
                className="absolute"
                style={{
                    top: "20%",
                    left: "75%",
                    transform: "translate(-50%, -50%)"
                }}
            >
                <div className="moon-glow absolute w-[160px] h-[160px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                        transform: "translate(-50%, -50%)",
                        filter: "blur(8px)"
                    }}
                />
                <div className="w-[120px] h-[120px] rounded-full relative"
                    style={{
                        background: "radial-gradient(circle at 35% 35%, #FFFFFF 0%, #FFF7E6 50%, #FFE5B4 100%)",
                        boxShadow: `
                            inset -8px -8px 20px rgba(0,0,0,0.2),
                            0 0 50px rgba(255,255,255,0.4),
                            0 0 100px rgba(255,247,230,0.2)
                        `,
                        transform: "translate(-50%, -50%)"
                    }}
                />
            </div>

            {/* Nuages nocturnes */}
            <div ref={cloudsRef} className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute cloud"
                        style={{
                            width: "300px",
                            height: "100px",
                            top: `${30 + i * 20}%`,
                            left: `-300px`,
                            background: "rgba(0,0,0,0.3)",
                            filter: "blur(20px)",
                            borderRadius: "50px"
                        }}
                    />
                ))}
            </div>
        </>
    );
};

export default NightSky;
