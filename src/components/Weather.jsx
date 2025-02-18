import { useState, useEffect } from "react";

const Weather = () => {
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&appid=TON_API_KEY`
        );
        const data = await response.json();
        setTemperature(Math.round(data.main.temp));
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération de la météo :", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="bg-white/10 p-4 rounded-lg 
                    border border-white/30 backdrop-blur-md">
      <img src="/sun.svg" alt="Soleil" className="w-10 h-10 mr-2" />
      <b className="text-[32px]">{loading ? "..." : `${temperature}°C`}</b>
    </div>
  );
};

export default Weather;
