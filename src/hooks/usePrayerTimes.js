import { useState, useEffect } from 'react';

const usePrayerTimes = () => {
    const [prayerTimes, setPrayerTimes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrayerTimes = async () => {
            try {
                const response = await fetch("https://api.aladhan.com/v1/timingsByCity?city=Paris&country=France&method=2");
                const data = await response.json();
                
                if (data.code === 200) {
                    setPrayerTimes({
                        fajr: data.data.timings.Fajr,
                        sunrise: data.data.timings.Sunrise,
                        dohr: data.data.timings.Dhuhr,
                        asr: data.data.timings.Asr,
                        maghrib: data.data.timings.Maghrib,
                        isha: data.data.timings.Isha
                    });
                } else {
                    throw new Error('Erreur lors de la récupération des horaires');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPrayerTimes();
        
        // Mettre à jour les horaires à minuit
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const timeUntilMidnight = tomorrow - now;

        const midnightTimeout = setTimeout(fetchPrayerTimes, timeUntilMidnight);

        return () => clearTimeout(midnightTimeout);
    }, []);

    return { prayerTimes, loading, error };
};

export default usePrayerTimes; 