import { useState, useEffect } from "react";

const PrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=Paris&country=France&method=2"
        );
        const data = await response.json();
        setPrayerTimes(data.data.timings);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des horaires :", error);
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  return (
    <div className=" text-white bg-white/10 p-6 rounded-lg border border-white/30 backdrop-blur-md">
      <h2 className="text-2xl font-semibold">Horaires de prière</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul className="mt-2 text-lg">
          <li>Fajr : {prayerTimes.Fajr}</li>
          <li>Dhuhr : {prayerTimes.Dhuhr}</li>
          <li>Asr : {prayerTimes.Asr}</li>
          <li>Maghrib : {prayerTimes.Maghrib}</li>
          <li>Isha : {prayerTimes.Isha}</li>
        </ul>
      )}
    </div>
  );
};

export default PrayerTimes;
