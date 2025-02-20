import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";
console.log("🎉 Déclenchement des confettis !");
import { getPrayerTimes, convertTimeToMinutes } from '../utils/prayerTimes';

const PrayerProgress = ({ prayerTimes, className }) => {
  const progressBarRef = useRef(null);
  const progressFillRef = useRef(null);
  const displayRef = useRef(null);
  const timeRef = useRef(null);
  const [displayTime, setDisplayTime] = useState({ hours: "00", minutes: "00", seconds: "00" });
  const [progress, setProgress] = useState(0);

  const triggerConfetti = () => {
    const duration = 8 * 1000;  // Augmenté à 5 secondes
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 45,  // Augmenté pour plus de dispersion
      spread: 360,
      ticks: 100,  // Augmenté pour plus de particules
      zIndex: 100,
      colors: ['#f6434c', '#602e1f', '#0c2036', '#ffffff', '#ffeb3b', '#ff9800'],  // Plus de couleurs
      disableForReducedMotion: true
    };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 200 * (timeLeft / duration);  // Doublé de 50 à 100

      // Confetti depuis les coins
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });

      // Confetti depuis le centre
      confetti({
        ...defaults,
        particleCount: particleCount,  // Augmenté (était particleCount/2)
        origin: { x: 0.5, y: 0.3 }
      });

      // Ajout de deux nouveaux points d'origine
      confetti({
        ...defaults,
        particleCount: particleCount * 0.8,
        origin: { x: 0.2, y: 0.5 }
      });
      confetti({
        ...defaults,
        particleCount: particleCount * 0.8,
        origin: { x: 0.8, y: 0.5 }
      });
    }, 200);  // Réduit de 250 à 200ms pour plus de fréquence
  };

  useEffect(() => {
    const getNextPrayer = async () => {
      try {
        const response = await fetch("https://api.aladhan.com/v1/timingsByCity?city=Paris&country=France&method=2");
        const data = await response.json();
        const prayers = {
          Fajr: data.data.timings.Fajr,
          Dhuhr: data.data.timings.Dhuhr,
          Asr: data.data.timings.Asr,
          Maghrib: data.data.timings.Maghrib,
          Isha: data.data.timings.Isha
        };

        const now = new Date();
        const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        
        const prayerTimes = Object.entries(prayers).map(([name, time]) => {
          const [hours, minutes] = time.split(':').map(Number);
          return {
            name,
            seconds: hours * 3600 + minutes * 60
          };
        });

        const next = prayerTimes.find(prayer => prayer.seconds > currentSeconds) || prayerTimes[0];
        
        let timeRemaining;
        if (next.seconds > currentSeconds) {
          timeRemaining = next.seconds - currentSeconds;
        } else {
          timeRemaining = (24 * 3600) - currentSeconds + next.seconds;
        }

        // Animation de la barre de progression
        gsap.fromTo(progressFillRef.current,
          { width: "0%" },
          {
            width: "100%",
            duration: timeRemaining,
            ease: "none"
          }
        );

        // Mise à jour du compte à rebours
        const updateDisplay = (secondsLeft) => {
          if (!displayRef.current) return;

          const hours = Math.floor(secondsLeft / 3600);
          const minutes = Math.floor((secondsLeft % 3600) / 60);
          const seconds = secondsLeft % 60;

          const newTime = {
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0')
          };

          // Animation des chiffres qui changent
          Object.entries(newTime).forEach(([unit, value]) => {
            if (displayTime[unit] !== value) {
              const digitElements = timeRef.current.querySelectorAll(`.${unit} .digit`);
              
              // Animation de chute pour chaque chiffre qui change
              digitElements.forEach((digit, index) => {
                const oldDigit = displayTime[unit][index];
                const newDigit = value[index];
                
                if (oldDigit !== newDigit) {
                  gsap.fromTo(digit,
                    { 
                      yPercent: -100,
                      opacity: 0,
                    },
                    {
                      yPercent: 0,
                      opacity: 1,
                      duration: 0.3,
                      ease: "bounce.out"
                    }
                  );
                }
              });
            }
          });

          setDisplayTime(newTime);
        };

        // Mise à jour chaque seconde
        let remaining = timeRemaining;
        const timer = setInterval(() => {
          remaining--;
          updateDisplay(remaining);
          if (remaining <= 0) {
            clearInterval(timer);
            getNextPrayer();
          }
        }, 1000);

        return () => clearInterval(timer);
      } catch (error) {
        console.error("Erreur lors de la récupération des horaires :", error);
      }
    };

    getNextPrayer();
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      if (!prayerTimes) return;

      const times = getPrayerTimes(prayerTimes);
      const now = new Date();
      let currentTime = now.getHours() * 60 + now.getMinutes();

      // Calculer la progression
      let start, end;
      if (currentTime >= times.fajr && currentTime < times.sunrise) {
        start = times.fajr;
        end = times.sunrise;
      } else if (currentTime >= times.sunrise && currentTime < times.dohr) {
        start = times.sunrise;
        end = times.dohr;
      } else if (currentTime >= times.dohr && currentTime < times.asr) {
        start = times.dohr;
        end = times.asr;
      } else if (currentTime >= times.asr && currentTime < times.maghrib) {
        start = times.asr;
        end = times.maghrib;
      } else if (currentTime >= times.maghrib && currentTime < times.isha) {
        start = times.maghrib;
        end = times.isha;
      } else {
        start = times.isha;
        end = times.fajr + 1440; // Ajouter 24h en minutes
        if (currentTime < times.fajr) {
          currentTime += 1440;
        }
      }

      const progressValue = ((currentTime - start) / (end - start)) * 100;
      const newProgress = Math.min(Math.max(progressValue, 0), 100);
      
      // Ne pas bloquer l'interface pendant l'adhan
      setProgress(newProgress);
      
      // Déclencher les confettis à 100% sans bloquer
      if (newProgress >= 99.8) {
    console.log("🎉 Déclenchement des confettis !");
    triggerConfetti();
}

    };

    updateProgress();
    const interval = setInterval(updateProgress, 60000); // Mise à jour chaque minute
    return () => clearInterval(interval);
  }, [prayerTimes]);

  return (
    <div className={`absolute bottom-0 left-0 w-full z-20 ${className}`}>
      {/* Compte à rebours */}
      <div ref={displayRef} className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[120px]">
        <div className="relative w-full h-full flex items-center justify-center gap-4">
          <div className="w-full h-full text-center text-white font-poppins relative">
            <div className="absolute inset-0 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)_inset] 
                          rounded-[30px] bg-gray/50 backdrop-blur-lg">
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <div ref={timeRef} className="text-[min(5vw,64px)] font-light tracking-[0.2em] flex gap-4">
                <span className="hours">
                  <span className="digit">{displayTime.hours[0]}</span>
                  <span className="digit">{displayTime.hours[1]}</span>
                </span>
                <span>:</span>
                <span className="minutes">
                  <span className="digit">{displayTime.minutes[0]}</span>
                  <span className="digit">{displayTime.minutes[1]}</span>
                </span>
                <span>:</span>
                <span className="seconds">
                  <span className="digit">{displayTime.seconds[0]}</span>
                  <span className="digit">{displayTime.seconds[1]}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nouvelle barre de progression */}
      <div className="w-full h-16 absolute bottom-0">
        <div 
          ref={progressBarRef}
          className="w-full h-full bg-black/20 backdrop-blur-sm relative overflow-hidden"
        >
          <div 
            ref={progressFillRef}
            className="h-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${progress}%`,
              background: 'linear-gradient(to right, #2ecc71, #27ae60)',
              boxShadow: '0 0 20px rgba(46, 204, 113, 0.6)',
              borderRadius: '0 4px 4px 0'
            }}
          />
          {/* Effet de brillance */}
          <div 
            className="absolute top-0 h-full opacity-30"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(to right, transparent, #2ecc71)',
              filter: 'blur(8px)',
              borderRadius: '0 4px 4px 0'
            }}
          />
          {/* Ligne brillante supérieure */}
          <div 
            className="absolute top-0 h-[1px] opacity-50"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(to right, transparent, #ffffff)',
              boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PrayerProgress;