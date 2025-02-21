import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import weatherIcon from '../assets/weather.png';

const Weather = () => {
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const tempRef = useRef(null);
  const containerRef = useRef(null);
  const iconRef = useRef(null);
  const glowRef = useRef(null);
  
  // Stocker les animations pour le cleanup
  const animationsRef = useRef({
    container: null,
    icon: null,
    temperature: null,
    glow: null
  });

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=48.962196350097656&longitude=2.5754003524780273&hourly=temperature_2m,precipitation_probability"
      );
      const data = await response.json();
      const currentHourIndex = new Date().getHours();
      const newTemp = Math.round(data.hourly.temperature_2m[currentHourIndex]);

      // Animation fluide de la température
      if (tempRef.current && temperature !== null) {
        animationsRef.current.temperature = gsap.to(tempRef.current, {
          textContent: newTemp,
          duration: 1.5,
          ease: "power2.inOut",
          snap: { textContent: 1 },
          onUpdate: () => {
            // Effet de glow pendant la transition
            gsap.to(glowRef.current, {
              opacity: 0.8,
              duration: 0.3,
              yoyo: true,
              repeat: 1
            });
          }
        });
      }

      setTemperature(newTemp);
      setLoading(false);
    } catch (error) {
      console.error("❌ Erreur météo:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    
    // Animation d'entrée optimisée
    const tl = gsap.timeline();
    
    animationsRef.current.container = tl.fromTo(containerRef.current,
      { 
        opacity: 0, 
        y: 20,
        scale: 0.95
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      }
    );

    // Animation de l'icône plus fluide
    animationsRef.current.icon = gsap.to(iconRef.current, {
      rotate: 360,
      duration: 30,
      repeat: -1,
      ease: "none",
      transformOrigin: "center center"
    });

    // Effet de pulsation subtil
    animationsRef.current.glow = gsap.to(containerRef.current, {
      boxShadow: "0 0 30px rgba(255,255,255,0.1)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    const interval = setInterval(fetchWeather, 600000);

    // Cleanup amélioré
    return () => {
      clearInterval(interval);
      Object.values(animationsRef.current).forEach(anim => anim?.kill());
    };
  }, []);

  return (
    <div className="w-full h-full grid place-items-center">
      <div 
        ref={containerRef}
        className="relative w-full h-full flex rounded-[30px] items-center justify-center transform-gpu"
      >
        <div 
          ref={glowRef}
          className="absolute inset-0 rounded-[30px] opacity-0"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)"
          }}
        />

        <div className="absolute inset-0 backdrop-blur-[40px] rounded-[30px] bg-gradient-to-b from-[#1a1a1a]/60 to-[#1a1a1a]/40 border-white/10 border shadow-lg"></div>

        <div className="relative flex items-center justify-center w-full px-4">
          <div ref={iconRef} className="flex-shrink-0 ml-5 mt-4 mb-3 transform-gpu">
            <img 
              src={weatherIcon} 
              alt="Météo"
              className="w-20 h-20 object-contain"
              style={{ willChange: 'transform' }}
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
