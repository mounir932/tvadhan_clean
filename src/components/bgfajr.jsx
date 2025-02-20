import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePrayerTimes } from "../utils/prayerHook";
import NightSky from "./NightSky";
const BgFajr = () => {
    const bgRef = useRef(null);
    const { prayerTimes } = usePrayerTimes();
    const [currentPhase, setCurrentPhase] = useState("Night");

    useEffect(() => {
        if (!prayerTimes) {
            console.warn("⚠️ `prayerTimes` non encore disponible pour `BgFajr`");
            return;
        }

        console.log("🎨 Mise à jour de `BgFajr` avec `prayerTimes` :", prayerTimes);

        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        // Définition des phases du ciel avec dégradés
        const skyColors = {
            Night: { from: "#000000", to: "#000016", start: prayerTimes.isha, end: prayerTimes.fajr_1 },
            Fajr_1: { from: "#2A2A5A", to: "#8A6BAF", start: prayerTimes.fajr_1, end: prayerTimes.fajr_2 },
            Fajr_2: { from: "#8A6BAF", to: "#FFB07A", start: prayerTimes.fajr_2, end: prayerTimes.sunrise },
            Sunrise: { from: "#7eb9ff", to: "#FFB07A", start: prayerTimes.sunrise, end: prayerTimes.dohr },
            Dohr: { from: "#0059FF", to: "#D1D1D1", start: prayerTimes.dohr, end: prayerTimes.asr },
            Asr: { from: "#0022FF", to: "#A9A9A9", start: prayerTimes.asr, end: prayerTimes.maghrib },
            Maghrib: { from: "#2A2A5A", to: "#FF6B6B", start: prayerTimes.maghrib, end: prayerTimes.isha }
        };

        // Trouver la phase actuelle et la prochaine
        let nextPhase = Object.entries(skyColors).find(([_, phase]) => currentTime < phase.end);
        if (!nextPhase) nextPhase = ["Night", skyColors.Night]; // Reprendre à la première phase
        const [phaseName, phaseData] = nextPhase;

        setCurrentPhase(phaseName);
        const nextPhaseTime = phaseData.end;

        // Temps restant jusqu'à la prochaine prière (en minutes)
        const timeRemaining = nextPhaseTime - currentTime;
        const durationInSeconds = timeRemaining * 60; // Convertir en secondes

        // Animation GSAP avec dégradé fluide
        gsap.to(bgRef.current, {
            background: `linear-gradient(to bottom, ${phaseData.from}, ${phaseData.to})`,
            duration: durationInSeconds, // 🔥 Durée basée sur le temps réel
            ease: "linear",
        });

        console.log(`⏳ Transition de ${currentPhase} à ${phaseName} sur ${durationInSeconds} secondes.`);

    }, [prayerTimes, currentPhase]);

    return (
        <div ref={bgRef} className="absolute inset-0 w-full h-screen">
             {/* 🌌 Ajout du ciel nocturne uniquement la nuit */}
             {(prayerTimes && currentPhase === "Night") && <NightSky />}
        </div>
    );

};

export default BgFajr;
