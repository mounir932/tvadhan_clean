import { useState } from 'react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

const AdhanTest = ({ onUpdateProgress, onUpdateCountdown }) => {
    const [isTestRunning, setIsTestRunning] = useState(false);

    const triggerConfettiAndAdhan = () => {
        const duration = 8 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { 
            startVelocity: 45,
            spread: 360,
            ticks: 100,
            zIndex: 100,
            colors: ['#f6434c', '#602e1f', '#0c2036', '#ffffff', '#ffeb3b', '#ff9800'],
            disableForReducedMotion: true
        };

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                clearInterval(interval);
                // Déclencher l'adhan via un événement personnalisé
                const event = new CustomEvent('startAdhan');
                window.dispatchEvent(event);
                return;
            }

            const particleCount = 100 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: 0.3, y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: 0.7, y: Math.random() - 0.2 }
            });
        }, 250);
    };

    const startTest = () => {
        if (isTestRunning) return;
        setIsTestRunning(true);

        let countdown = 10;
        // Mettre à jour la barre de progression et le compte à rebours
        onUpdateProgress(100);
        onUpdateCountdown(countdown);

        const countdownInterval = setInterval(() => {
            countdown--;
            // Mettre à jour la progression (10 secondes = 100%)
            const progress = (countdown / 10) * 100;
            onUpdateProgress(progress);
            onUpdateCountdown(countdown);

            if (countdown <= 0) {
                clearInterval(countdownInterval);
                triggerConfettiAndAdhan();
                setIsTestRunning(false);
            }
        }, 1000);
    };

    return (
        <button
            onClick={startTest}
            disabled={isTestRunning}
            className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 
                     text-white font-bold py-2 px-4 rounded z-50 transition-colors"
        >
            {isTestRunning ? 'Test en cours...' : 'Tester Adhan'}
        </button>
    );
};

export default AdhanTest; 