import * as THREE from 'three';
import { getPrayerTimes, convertTimeToMinutes } from './prayerTimes';

export const getTimeBasedColor = (prayerTimes, options = {}) => {
    if (!prayerTimes) return null;

    const times = getPrayerTimes(prayerTimes);
    const now = new Date();
    const currentTime = convertTimeToMinutes(`${now.getHours()}:${now.getMinutes()}`);

    // Couleurs par défaut
    const defaultColors = {
        fajr: 0x1B1B3A,      // Bleu nuit profond
        sunrise: 0x87CEEB,    // Bleu ciel clair
        dohr: 0x4B9FE1,      // Bleu ciel moyen
        asr: 0x4682B4,       // Bleu acier
        maghrib: 0x4A266A,   // Violet profond
        night: 0x1a1a2e      // Bleu nuit sombre
    };

    // Fusion avec les couleurs personnalisées
    const colors = { ...defaultColors, ...options };

    let color;
    if (currentTime >= times.fajr && currentTime < times.sunrise) {
        color = new THREE.Color(colors.fajr);
    } else if (currentTime >= times.sunrise && currentTime < times.dohr) {
        color = new THREE.Color(colors.sunrise);
    } else if (currentTime >= times.dohr && currentTime < times.asr) {
        color = new THREE.Color(colors.dohr);
    } else if (currentTime >= times.asr && currentTime < times.maghrib) {
        color = new THREE.Color(colors.asr);
    } else if (currentTime >= times.maghrib && currentTime < times.isha) {
        color = new THREE.Color(colors.maghrib);
    } else {
        color = new THREE.Color(colors.night);
    }

    return color;
};

// Version CSS pour les éléments non-Three.js
export const getTimeBasedColorCSS = (prayerTimes, options = {}) => {
    if (!prayerTimes) return null;

    const times = getPrayerTimes(prayerTimes);
    const now = new Date();
    const currentTime = convertTimeToMinutes(`${now.getHours()}:${now.getMinutes()}`);

    // Couleurs CSS par défaut
    const defaultColors = {
        fajr: '#1B1B3A',
        sunrise: '#87CEEB',
        dohr: '#4B9FE1',
        asr: '#4682B4',
        maghrib: '#4A266A',
        night: '#1a1a2e'
    };

    const colors = { ...defaultColors, ...options };

    if (currentTime >= times.fajr && currentTime < times.sunrise) {
        return colors.fajr;
    } else if (currentTime >= times.sunrise && currentTime < times.dohr) {
        return colors.sunrise;
    } else if (currentTime >= times.dohr && currentTime < times.asr) {
        return colors.dohr;
    } else if (currentTime >= times.asr && currentTime < times.maghrib) {
        return colors.asr;
    } else if (currentTime >= times.maghrib && currentTime < times.isha) {
        return colors.maghrib;
    } else {
        return colors.night;
    }
};

// Fonction pour obtenir des gradients CSS
export const getTimeBasedGradient = (prayerTimes, options = {}) => {
    if (!prayerTimes) return null;

    const times = getPrayerTimes(prayerTimes);
    const now = new Date();
    const currentTime = convertTimeToMinutes(`${now.getHours()}:${now.getMinutes()}`);

    // Gradients par défaut
    const defaultGradients = {
        fajr: ['#1B1B3A', '#2A2A5A'],
        sunrise: ['#87CEEB', '#FFA07A'],
        dohr: ['#4B9FE1', '#87CEEB'],
        asr: ['#4682B4', '#4B9FE1'],
        maghrib: ['#4A266A', '#FF6B6B'],
        night: ['#1a1a2e', '#000000']
    };

    const gradients = { ...defaultGradients, ...options };

    let colors;
    if (currentTime >= times.fajr && currentTime < times.sunrise) {
        colors = gradients.fajr;
    } else if (currentTime >= times.sunrise && currentTime < times.dohr) {
        colors = gradients.sunrise;
    } else if (currentTime >= times.dohr && currentTime < times.asr) {
        colors = gradients.dohr;
    } else if (currentTime >= times.asr && currentTime < times.maghrib) {
        colors = gradients.asr;
    } else if (currentTime >= times.maghrib && currentTime < times.isha) {
        colors = gradients.maghrib;
    } else {
        colors = gradients.night;
    }

    return `linear-gradient(to bottom, ${colors[0]}, ${colors[1]})`;
}; 