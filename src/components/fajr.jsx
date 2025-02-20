import { useState, useEffect } from "react";

const Fajr = () => {
  const [fajrTime, setFajrTime] = useState("Chargement...");

  useEffect(() => {
    // Appel à l'API de prière
    fetch("https://api.aladhan.com/v1/timingsByCity?city=Paris&country=France&method=2")
      .then((response) => response.json())
      .then((data) => {
        setFajrTime(data.data.timings.Fajr);
      })
      .catch((error) => console.error("Erreur lors de la récupération des horaires :", error));
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {/* Conteneur Principal avec le fond */}
      <div className="w-full h-full text-center text-white font-poppins relative">
        
        {/* Fond Glass */}
        <div className="absolute w-[350px] h-[200px] inset-0 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)_inset] 
                        rounded-[30px] bg-gray/50 backdrop-blur-lg">
        </div>

        {/* Conteneur du texte */}
        <div className="absolute w-[350px] inset-0 flex flex-col justify-center items-center gap-4">
          {/* Nom de la prière */}
          <div className="text-[min(4vw,60px)] font-light">
            <p className="m-0">الفجر</p>
            <p className="mt-[-15px] text-[min(2vw,30px)]">Fajr</p>
          </div>

          {/* Heure de la prière */}
          <div className="text-[min(4vw,50px)] font-light tracking-widest">
            {fajrTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fajr;
  