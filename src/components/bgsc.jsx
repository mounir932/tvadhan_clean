import { useEffect, useRef } from "react";
import gsap from "gsap";

const Bgsc = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        console.log("✨ Initialisation de l'animation particules...");
        if (!containerRef.current) return;

        // Nettoyer le conteneur
        containerRef.current.innerHTML = '';

        // Création des particules
        const particleCount = 15;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.style.cssText = `
                position: absolute;
                width: ${gsap.utils.random(3, 6)}px;
                height: ${gsap.utils.random(3, 6)}px;
                background: rgba(255, 255, 255, ${gsap.utils.random(0.1, 0.3)});
                border-radius: 50%;
                box-shadow: 0 0 ${gsap.utils.random(10, 20)}px ${gsap.utils.random(3, 8)}px rgba(255, 255, 255, 0.3);
                pointer-events: none;
                opacity: 0;
            `;
            containerRef.current.appendChild(particle);
            particles.push(particle);

            // Position initiale aléatoire
            gsap.set(particle, {
                x: gsap.utils.random(0, window.innerWidth),
                y: gsap.utils.random(0, window.innerHeight * 0.55)
            });

            // Animation principale
            animateParticle(particle);
        }

        // Création des lignes de lumière
        const lineCount = 8;
        for (let i = 0; i < lineCount; i++) {
            const line = document.createElement("div");
            line.className = "light-line";
            line.style.cssText = `
                position: absolute;
                width: ${gsap.utils.random(100, 300)}px;
                height: 1px;
                background: linear-gradient(90deg, 
                    rgba(255, 255, 255, 0),
                    rgba(255, 255, 255, ${gsap.utils.random(0.05, 0.15)}),
                    rgba(255, 255, 255, 0)
                );
                transform-origin: center;
                opacity: 0;
            `;
            containerRef.current.appendChild(line);

            // Animation des lignes
            animateLine(line);
        }

        function animateParticle(particle) {
            gsap.to(particle, {
                x: gsap.utils.random(0, window.innerWidth),
                y: gsap.utils.random(0, window.innerHeight * 0.55),
                opacity: gsap.utils.random(0.2, 0.6),
                duration: gsap.utils.random(4, 8),
                ease: "none",
                onComplete: () => animateParticle(particle),
                onStart: () => {
                    gsap.to(particle, {
                        opacity: 0,
                        duration: 2,
                        ease: "power1.in",
                        delay: gsap.utils.random(1, 3)
                    });
                }
            });
        }

        function animateLine(line) {
            const startX = gsap.utils.random(0, window.innerWidth);
            const startY = gsap.utils.random(0, window.innerHeight * 0.55);
            
            gsap.set(line, {
                x: startX,
                y: startY,
                rotation: gsap.utils.random(-45, 45)
            });

            gsap.to(line, {
                opacity: gsap.utils.random(0.3, 0.6),
                duration: 1,
                yoyo: true,
                repeat: 1,
                ease: "power1.inOut",
                onComplete: () => {
                    setTimeout(() => animateLine(line), gsap.utils.random(1000, 3000));
                }
            });
        }

        // Nettoyage
        return () => {
            containerRef.current?.childNodes.forEach(node => {
                gsap.killTweensOf(node);
            });
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full"
            style={{
                background: 'transparent',
                overflow: 'hidden'
            }}
        />
    );
};

export default Bgsc;

