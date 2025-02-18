import { useState, useEffect } from "react";

const Ishaa = () => {
  const [ishaaTime, setIshaaTime] = useState("Chargement...");

  useEffect(() => {
    fetch("https://api.aladhan.com/v1/timingsByCity?city=Paris&country=France&method=2")
      .then((response) => response.json())
      .then((data) => {
        setIshaaTime(data.data.timings.Isha);
      })
      .catch((error) => console.error("Erreur lors de la récupération des horaires :", error));
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full h-full text-center text-white font-poppins relative">
        <div className="absolute inset-0 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)_inset] 
                        rounded-[30px] bg-gray/50 backdrop-blur-lg">
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-4">
          <div className="text-[min(4vw,60px)] font-light">
            <p className="m-0">العشاء</p>
            <p className="mt-[-15px] text-[min(2vw,30px)]">Ishaa</p>
          </div>
          <div className="text-[min(4vw,50px)] font-light tracking-widest">
            {ishaaTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ishaa; 