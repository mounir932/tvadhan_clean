import { useState, useEffect } from "react";

// 📌 Fonction pour convertir "HH:MM" en minutes
const convertTimeToMinutes = (time) => {
    if (!time || typeof time !== "string") return 0;
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

// 📌 Fonction pour convertir les horaires récupérés en minutes
const convertPrayerTimes = (times) => {
    if (!times) {
        console.warn("⚠️ `convertPrayerTimes` a reçu `null`.");
        return null;
    }

    const convertedTimes = {
        fajr_1: convertTimeToMinutes(times.Fajr) - 20,
        fajr_2: convertTimeToMinutes(times.Fajr),
        fajr: convertTimeToMinutes(times.Fajr),
        sunrise: convertTimeToMinutes(times.Sunrise),
        dohr: convertTimeToMinutes(times.Dhuhr),
        asr: convertTimeToMinutes(times.Asr),
        maghrib: convertTimeToMinutes(times.Maghrib),
        isha: convertTimeToMinutes(times.Isha)
    };

    console.log("⏳ Horaires convertis en minutes :", convertedTimes);
    return convertedTimes;
};

// 📌 Hook React pour charger les horaires dès le montage du composant
export const usePrayerTimes = () => {
    const [prayerTimes, setPrayerTimes] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrayerTimes = async () => {
            try {
                console.log("🌍 Récupération des horaires en cours...");
                const response = await fetch("https://api.aladhan.com/v1/timingsByCity?city=Paris&country=France&method=2");
                const data = await response.json();

                if (data?.data?.timings) {
                    console.log("✅ Horaires récupérés :", data.data.timings);
                    setPrayerTimes(convertPrayerTimes(data.data.timings)); // 🔥 Met à jour `prayerTimes`
                } else {
                    console.error("⚠️ Données invalides reçues :", data);
                }
            } catch (error) {
                console.error("❌ Erreur lors de la récupération des horaires :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrayerTimes(); // 🔥 Appelle `fetchPrayerTimes()` au montage
    }, []);

    useEffect(() => {
        console.log("🆕 `prayerTimes` mis à jour dans React :", prayerTimes);
    }, [prayerTimes]);

    return { prayerTimes, loading };
};
