import Fajr from "./fajr";
import Dohr from "./dohr";
import Asr from "./asr";
import Maghreb from "./maghreb";
import Ishaa from "./ishaa";
import PrayerProgress from "./PrayerProgress";


const Contenersalat = () => {
    return (
        <div className="w-full h-full grid place-items-center ">
            <div className="relative w-full h-full flex items-center justify-center">
                

                {/* Fond avec effet glassmorphism */}
                <div className="absolute inset-0 z-10 backdrop-blur-[30px] rounded-[40px] bg-[#1a1a1a]/20 border-white/10 border shadow-lg"></div>
                
                {/* Contenu */}
                <div className="relative w-full h-full p-10 z-20">
                    {/* Titre */}
                    <span className="block text-[min(40px)] font-bold text-white tracking-[0.04em] font-poppins text-center">
                        Horaires des prières
                    </span>
                
                    {/* Container pour toutes les prières */}
                    <div className="flex flex-col gap-24 mt-24">
                        {/* Première ligne : Fajr, Dohr, Asr */}
                        <div className="flex justify-between items-center px-20">
                            <div className="w-[320px] h-[200px]">
                                <Fajr />
                            </div>
                            <div className="w-[320px] h-[200px]">
                                <Dohr />
                            </div>
                            <div className="w-[320px] h-[200px]">
                                <Asr />
                            </div>
                        </div>

                        {/* Deuxième ligne : Maghreb, Ishaa */}
                        <div className="flex justify-center items-center gap-20 mt-20">
                            <div className="w-[350px] h-[200px]">
                                <Maghreb />
                            </div>
                            <div className="w-[350px] h-[200px]">
                                <Ishaa />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barre de progression */}
                <PrayerProgress className="z-20" />
            </div>
        </div>
    );
};

export default Contenersalat;
