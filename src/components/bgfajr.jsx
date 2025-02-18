import { useEffect, useRef } from "react";
import gsap from "gsap";

const BgFajr = () => {
    const bgRef = useRef(null);

    useEffect(() => {
        const animateBackground = () => {
            const skyColors = {
                Night: { 
                    from: "#1a1a2e",
                    to: "#16213e"
                },
                Dawn: { 
                    from: "#ff9a9e",
                    to: "#fad0c4"
                },
                Morning: { 
                    from: "#4facfe",
                    to: "#00f2fe"
                },
                Noon: { 
                    from: "#2196f3",
                    to: "#4dabf5"
                },
                Afternoon: { 
                    from: "#48c6ef",
                    to: "#6f86d6"
                },
                Sunset: { 
                    from: "#fa709a",
                    to: "#fee140"
                },
                Dusk: { 
                    from: "#1a1a2e",
                    to: "#16213e"
                }
            };

            // Créer des variables CSS personnalisées pour le gradient
            const root = document.documentElement;
            root.style.setProperty('--gradient-from', skyColors.Night.from);
            root.style.setProperty('--gradient-to', skyColors.Night.to);

            const tl = gsap.timeline({
                repeat: -1,
                defaults: { 
                    ease: "none",
                    duration: 1.66  // 10 secondes ÷ 6 transitions
                }
            });

            // Animation des couleurs
            Object.values(skyColors).forEach(color => {
                tl.to(root, {
                    '--gradient-from': color.from,
                    '--gradient-to': color.to,
                });
            });

            tl.duration(10); // Durée totale réduite à 10 secondes
        };

        animateBackground();

        return () => {
            gsap.killTweensOf(document.documentElement);
        };
    }, []);

    return (
        <div 
            ref={bgRef}
            className="w-full h-full transition-colors duration-500" // Réduit la durée de transition CSS
            style={{
                background: 'linear-gradient(to bottom, var(--gradient-from), var(--gradient-to))'
            }}
        />
    );
};

export default BgFajr;
