import { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Fond avec effet glassmorphism */}
        <div className="absolute inset-0 backdrop-blur-[20px] rounded-[30px] bg-[#1a1a1a]/50 border-white/10 border shadow-lg"></div>
        {/* Contenu */}
        <div className="relative">
          <span 
            className="block text-[min(12vw,200px)] font-bold text-transparent bg-white
                     from-white via-white to-black bg-clip-text tracking-[0.04em] font-poppins
                     [text-shadow:inset_0_2px_4px_rgba(0,0,0,0.5)]
                     [-webkit-text-stroke:1px_rgba(255,255,255,0.1)]"
          >
            {formattedTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Clock;