import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrayerTimes } from "../utils/prayerHook";

const Sun = () => {
    const sunRef = useRef(null);
    const glowRef = useRef(null);
    const { prayerTimes, loading } = usePrayerTimes();

    useEffect(() => {
        if (loading || !prayerTimes) {
            console.log("⏳ Attente du chargement des horaires de prière...");
            return;
        }

        console.log("✅ Horaires de prière récupérés :", prayerTimes);

        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        console.log("🕒 Heure actuelle en minutes :", currentTime);

        // 🎯 Position + Couleurs du soleil avec `radial-gradient`
        const sunPhases = {
            Night: {
                pos: "120%",
                color: "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)",
                glow: "rgba(0,0,0,0)",
                start: prayerTimes.isha,
                end: prayerTimes.fajr_1
            },
            Fajr_1: {
                pos: "90%",
                color: "radial-gradient(circle, #FF9900 10%, #FFB000 40%, rgba(255, 140, 0, 0.3) 90%)",
                glow: "rgba(255, 140, 0, 0.7)",
                start: prayerTimes.fajr_1,
                end: prayerTimes.fajr_2
            },
            Fajr_2: {
                pos: "85%",
                color: "radial-gradient(circle, #FFAA00 20%, #FFD700 50%, rgba(255, 200, 0, 0.5) 90%)",
                glow: "rgba(255, 165, 0, 0.8)",
                start: prayerTimes.fajr_2,
                end: prayerTimes.sunrise
            },
            Sunrise: {
                pos: "70%",
                color: "radial-gradient(circle, #FFD700 30%, #FFF000 60%, rgba(255, 215, 0, 0.3) 100%)",
                glow: "rgba(255, 215, 0, 1)",
                start: prayerTimes.sunrise,
                end: prayerTimes.dohr
            },
            Dohr: {
                pos: "10%",
                color: "radial-gradient(circle, #FFFFFF 30%, #FFF9C4 70%, rgba(255, 255, 224, 0.3) 100%)",
                glow: "rgba(255, 255, 224, 1)",
                start: prayerTimes.dohr,
                end: prayerTimes.asr
            },
            Asr: {
                pos: "50%",
                color: "radial-gradient(circle, #FFA500 30%, #FFD700 70%, rgba(255, 165, 0, 0.4) 100%)",
                glow: "rgba(255, 165, 0, 0.9)",
                start: prayerTimes.asr,
                end: prayerTimes.maghrib
            },
            Maghrib: {
                pos: "90%",
                color: "radial-gradient(circle, #FF4500 30%, #FF8C00 70%, rgba(255, 69, 0, 0.5) 100%)",
                glow: "rgba(255, 69, 0, 0.7)",
                start: prayerTimes.maghrib,
                end: prayerTimes.isha
            },
            Isha: {
                pos: "120%",
                color: "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)",
                glow: "rgba(0,0,0,0)",
                start: prayerTimes.isha,
                end: prayerTimes.fajr_1
            }
        };

        // 🔍 Trouver la phase actuelle et la suivante
        let currentPhase = "Night";
        let nextPhase = null;

        Object.keys(sunPhases).forEach((key, index, array) => {
            if (currentTime >= sunPhases[key].start && currentTime < sunPhases[key].end) {
                currentPhase = key;
                nextPhase = array[index + 1] || "Night";
            }
        });

        console.log("🌞 Période actuelle détectée :", currentPhase);
        console.log("📍 Position cible du soleil :", sunPhases[currentPhase].pos);
        console.log("🎨 Couleur cible du soleil :", sunPhases[currentPhase].color);

        if (!sunRef.current || !glowRef.current) {
            console.warn("⚠️ `sunRef.current` ou `glowRef.current` est null, GSAP ne peut pas animer.");
            return;
        }

        // ⏳ Temps restant avant la prochaine phase
        const nextPhaseStart = sunPhases[nextPhase]?.start || prayerTimes.fajr_1;
        const timeRemaining = nextPhaseStart - currentTime;
        const durationInSeconds = timeRemaining * 60;

        console.log(`⏳ Transition de ${currentPhase} à ${nextPhase} sur ${durationInSeconds} secondes.`);

        // 🌟 Animation GSAP de la position du soleil
        gsap.to(sunRef.current, {
            top: sunPhases[currentPhase].pos,
            duration: durationInSeconds,
            ease: "linear",
        });

        // 🎨 Animation GSAP de la couleur du soleil
        gsap.to(sunRef.current, {
            background: sunPhases[currentPhase].color,
            duration: durationInSeconds,
            ease: "linear",
        });

        // 🔆 Animation du halo lumineux
        gsap.to(glowRef.current, {
            scale: 3.5,
            opacity: currentPhase === "Night" ? 0 : 1,
            background: sunPhases[currentPhase].glow,
            repeat: -1,
            yoyo: true,
            duration: 3,
            ease: "sine.inOut",
        });

    }, [prayerTimes, loading]);

    return (
        <>
            {/* Halo lumineux */}
            <div
                ref={glowRef}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[500px] h-[500px] opacity-60 blur-[100px]"
                style={{
                    top: "130%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: "50%",
                    background: "rgba(255, 215, 0, 1)"
                }}
            />
            
            {/* Soleil avec `radial-gradient` */}
            <div
                ref={sunRef}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[330px] h-[330px] shadow-2xl"
                style={{
                    top: "120%",
                    transform: "translate(-50%, -50%)",
                    background: "radial-gradient(circle, #FFD700 30%, #FF8C00 70%, rgba(255,140,0,0.5) 100%)",
                    borderRadius: "50%",
                    boxShadow: "0 0 150px rgba(255, 204, 0, 1)",
                    filter: "blur(25px)"
                }}
            />
        </>
    );
};

export default Sun;
