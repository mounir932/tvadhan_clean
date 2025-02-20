import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import weatherIcon from '../assets/weather.png';

const Weather = () => {
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const tempRef = useRef(null);
  const containerRef = useRef(null);
  const iconRef = useRef(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=48.962196350097656&longitude=2.5754003524780273&hourly=temperature_2m,precipitation_probability"
      );
      const data = await response.json();
      const currentHourIndex = new Date().getHours();
      const newTemp = Math.round(data.hourly.temperature_2m[currentHourIndex]);

      // Animation de transition de température
      if (tempRef.current && temperature !== null) {
        gsap.to(tempRef.current, {
          innerHTML: newTemp,
          duration: 1,
          snap: { innerHTML: 1 },
          ease: "power2.out"
        });
      }

      setTemperature(newTemp);
      setLoading(false);
      console.log("✅ Météo mise à jour :", `${newTemp}°C`);
    } catch (error) {
      console.error("❌ Erreur météo:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    
    // Animation d'entrée
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Animation de l'icône
    gsap.to(iconRef.current, {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full grid place-items-center">
      <div 
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
      >
        <div className="absolute inset-0 backdrop-blur-[40px] rounded-[30px] bg-[#1a1a1a]/50 border-white/10 border shadow-lg"></div>
        <div className="relative flex items-center justify-center w-full px-4">
          <div ref={iconRef} className="flex-shrink-0 ml-5 mt-4 mb-3">
            <img 
              src={weatherIcon} 
              alt="Météo"
              className="w-20 h-20 object-contain"
            />
          </div>
          
          <div className="flex-grow text-center ml-10">
            {loading ? (
              <b className="text-[52px] text-white">...</b>
            ) : (
              <b ref={tempRef} className="text-[52px] text-white font-poppins">
                {temperature}
              </b>
            )}
            <span className="text-[52px] text-white font-poppins">°C</span>
          </div>
          
          <div className="flex-shrink-0 w-10 mr-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
