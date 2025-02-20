/*export const convertTimeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
};

export const getPrayerTimes = (prayerTimes) => {
    return {
        fajr: convertTimeToMinutes(prayerTimes.fajr),
        sunrise: convertTimeToMinutes(prayerTimes.sunrise),
        dohr: convertTimeToMinutes(prayerTimes.dohr),
        maghrib: convertTimeToMinutes(prayerTimes.maghrib),
        isha: convertTimeToMinutes(prayerTimes.isha)
    };
}; */
export const convertTimeToMinutes = (time) => {
    if (typeof time === "number") {
        console.log("✅ Pas de conversion nécessaire, déjà en minutes:", time);
        return time; // Déjà en minutes
    }

    if (typeof time !== "string") {
        console.error("❌ Erreur: format invalide reçu dans `convertTimeToMinutes()`:", time);
        return 0; // Retourne 0 pour éviter un crash
    }

    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

export const getPrayerTimes = (prayerTimes) => {
    console.log("🔍 Valeurs reçues dans `getPrayerTimes()` :", prayerTimes);

    return {
        fajr: prayerTimes.fajr, // Déjà en minutes, pas besoin de conversion
        sunrise: prayerTimes.sunrise,
        dohr: prayerTimes.dohr,
        asr: prayerTimes.asr,
        maghrib: prayerTimes.maghrib,
        isha: prayerTimes.isha
    };
};

