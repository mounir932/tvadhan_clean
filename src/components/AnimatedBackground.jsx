import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { getPrayerTimes, convertTimeToMinutes } from '../utils/prayerTimes';

const AnimatedBackground = ({ prayerTimes }) => {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const starsRef = useRef([]);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        if (sceneRef.current) return;

        console.log('Initializing Three.js scene');
        
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Configuration de la caméra
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.z = 100;
        camera.position.y = 20;
        camera.rotation.x = -0.2;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Création des étoiles avec texture
        const createStars = () => {
            const starTexture = new THREE.TextureLoader().load('/star.png');
            const starGeometry = new THREE.BufferGeometry();
            const vertices = [];
            const sizes = [];
            const colors = [];

            for (let i = 0; i < 15000; i++) {
                const x = (Math.random() - 0.5) * 2000;
                const y = (Math.random() - 0.5) * 2000;
                const z = -Math.random() * 2000;

                vertices.push(x, y, z);

                // Variation de taille
                const size = Math.random() * 4 + 0.5;
                sizes.push(size);

                // Variation de couleur
                const r = 0.9 + Math.random() * 0.1; // Blanc légèrement variable
                const g = 0.9 + Math.random() * 0.1;
                const b = Math.random() > 0.5 ? 1 : 0.8 + Math.random() * 0.2; // Certaines étoiles plus bleues
                colors.push(r, g, b);
            }

            starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            starGeometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
            starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

            const starMaterial = new THREE.PointsMaterial({
                size: 1,
                transparent: true,
                opacity: 1,
                map: starTexture,
                sizeAttenuation: true,
                blending: THREE.AdditiveBlending,
                vertexColors: true
            });

            const stars = new THREE.Points(starGeometry, starMaterial);
            scene.add(stars);
            starsRef.current = stars;
        };

        createStars();

        const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate);

            const time = Date.now() * 0.0005;

            if (starsRef.current) {
                starsRef.current.rotation.y = time * 0.05;
                starsRef.current.rotation.x = Math.sin(time) * 0.02;
                
                const positions = starsRef.current.geometry.attributes.position.array;
                const sizes = starsRef.current.geometry.attributes.size.array;

                for(let i = 0; i < positions.length; i += 3) {
                    sizes[i/3] = Math.abs(Math.sin(time + i) * 0.5) + 0.5;
                }
                starsRef.current.geometry.attributes.size.needsUpdate = true;
            }

            renderer.render(scene, camera);
        };

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameRef.current);
            
            if (starsRef.current) {
                scene.remove(starsRef.current);
                starsRef.current.geometry.dispose();
                starsRef.current.material.dispose();
            }
            
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
            
            if (containerRef.current && rendererRef.current?.domElement) {
                containerRef.current.removeChild(rendererRef.current.domElement);
            }

            sceneRef.current = null;
            rendererRef.current = null;
            cameraRef.current = null;
            starsRef.current = null;
        };
    }, []);

    // Effet pour la mise à jour des couleurs de fond
    useEffect(() => {
        if (!sceneRef.current || !prayerTimes) return;
        
        const updateBackground = () => {
            const times = getPrayerTimes(prayerTimes);
            const now = new Date();
            const currentTime = convertTimeToMinutes(`${now.getHours()}:${now.getMinutes()}`);

            let color;
            if (currentTime >= times.fajr && currentTime < times.sunrise) {
                color = new THREE.Color(0x1B1B3A);
            } else if (currentTime >= times.sunrise && currentTime < times.dohr) {
                color = new THREE.Color(0x87CEEB);
            } else if (currentTime >= times.dohr && currentTime < times.asr) {
                color = new THREE.Color(0x4B9FE1);
            } else if (currentTime >= times.asr && currentTime < times.maghrib) {
                color = new THREE.Color(0x4682B4);
            } else if (currentTime >= times.maghrib && currentTime < times.isha) {
                color = new THREE.Color(0x4A266A);
            } else {
                color = new THREE.Color(0x1a1a2e);
            }

            sceneRef.current.background = color;
        };

        updateBackground();
    }, [prayerTimes]);

    return (
        <div 
            ref={containerRef} 
            className="fixed inset-0 w-full h-full z-0"
        />
    );
};

export default AnimatedBackground; 