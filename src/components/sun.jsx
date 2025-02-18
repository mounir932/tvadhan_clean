import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { getPrayerTimes, convertTimeToMinutes } from '../utils/prayerTimes';

const Sun = ({ prayerTimes }) => {
    const sunRef = useRef();

    useFrame(() => {
        if (!sunRef.current || !prayerTimes) return;

        const times = getPrayerTimes(prayerTimes);
        const now = new Date();
        const currentTime = convertTimeToMinutes(`${now.getHours()}:${now.getMinutes()}`);

        let y = -30; // Default position (night)

        if (currentTime >= times.fajr && currentTime < times.sunrise) {
            y = -20; // Dawn
        } else if (currentTime >= times.sunrise && currentTime < times.dohr) {
            y = 0; // Morning
        } else if (currentTime >= times.dohr && currentTime < times.maghrib) {
            y = 20; // Noon
        } else if (currentTime >= times.maghrib && currentTime < times.isha) {
            y = -20; // Sunset
        }

        sunRef.current.position.y = y;
    });

    return (
        <mesh ref={sunRef} position={[0, -30, -50]}>
            <sphereGeometry args={[5, 32, 32]} />
            <meshBasicMaterial color="#FDB813" />
        </mesh>
    );
};

const ThreeBackground = ({ prayerTimes }) => {
    return (
        <div className="fixed inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 100], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <Sun prayerTimes={prayerTimes} />
                {/* Autres composants */}
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
