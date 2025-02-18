import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useRef, useEffect, useMemo, useCallback, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const convertTimeToMinutes = (timeString) => {
    if (!timeString) return 0;
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
};

const StarField = ({ opacity }) => {
    const starsRef = useRef();
    
    // Création des étoiles
    const [positions, sizes] = useMemo(() => {
        const positions = new Float32Array(2000 * 3);
        const sizes = new Float32Array(2000);
        
        for (let i = 0; i < 2000; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 2000; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 2000; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 2000; // z
            sizes[i] = Math.random() * 2;
        }
        
        return [positions, sizes];
    }, []);

    useFrame(() => {
        if (starsRef.current) {
            starsRef.current.rotation.y += 0.0001;
        }
    });

    return (
        <points ref={starsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={sizes.length}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={1.5}
                sizeAttenuation={true}
                color="white"
                transparent
                opacity={opacity}
                fog={true}
            />
        </points>
    );
};

const Moon = ({ visible }) => {
    const moonRef = useRef();
    const glowRef = useRef();

    // Texture procédurale pour les cratères
    const moonTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        // Fond de base
        const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(1, '#f4f4f4');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);

        // Ajouter des cratères
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const radius = Math.random() * 20 + 5;
            
            const craterGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
            craterGradient.addColorStop(0, 'rgba(120, 120, 120, 0.8)');
            craterGradient.addColorStop(0.8, 'rgba(140, 140, 140, 0.2)');
            craterGradient.addColorStop(1, 'rgba(160, 160, 160, 0)');
            
            ctx.fillStyle = craterGradient;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        return new THREE.CanvasTexture(canvas);
    }, []);

    useFrame((state) => {
        if (moonRef.current) {
            moonRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
            // Effet de scintillement subtil
            const glow = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1 + 0.9;
            if (glowRef.current) {
                glowRef.current.material.opacity = glow * 0.5;
            }
        }
    });

    return (
        <group position={[15, 8, -20]} visible={visible}>
            {/* Halo atmosphérique */}
            <sprite ref={glowRef} scale={[12, 12, 1]}>
                <spriteMaterial
                    transparent
                    blending={THREE.AdditiveBlending}
                    map={new THREE.TextureLoader().load('/glow.png')}
                    color="#ffedb3"
                    opacity={0.4}
                />
            </sprite>

            {/* Lune */}
            <mesh ref={moonRef}>
                <sphereGeometry args={[2, 64, 64]} />
                <meshPhysicalMaterial
                    map={moonTexture}
                    color="#fff6e6"
                    emissive="#ffedb3"
                    emissiveIntensity={0.1}
                    roughness={0.8}
                    metalness={0.1}
                    clearcoat={0.1}
                    clearcoatRoughness={0.4}
                    sheen={1}
                    sheenRoughness={0.5}
                    sheenColor="#ffedb3"
                />
            </mesh>

            {/* Lueur interne */}
            <mesh scale={[2.05, 2.05, 2.05]}>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial
                    color="#ffedb3"
                    transparent
                    opacity={0.1}
                    blending={THREE.AdditiveBlending}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    );
};

const ShootingStars = ({ visible }) => {
    const groupRef = useRef();

    const createShootingStar = useCallback(() => {
        const numStars = 15; // Nombre d'étoiles dans la pluie
        
        for (let i = 0; i < numStars; i++) {
            setTimeout(() => {
                const geometry = new THREE.BufferGeometry();
                const material = new THREE.ShaderMaterial({
                    transparent: true,
                    uniforms: {
                        time: { value: 0 }
                    },
                    vertexShader: `
                        varying vec2 vUv;
                        void main() {
                            vUv = uv;
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `,
                    fragmentShader: `
                        varying vec2 vUv;
                        uniform float time;
                        void main() {
                            float strength = 1.0 - distance(vUv.y, 0.5) * 2.0;
                            strength = pow(strength, 3.0);
                            gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
                        }
                    `
                });

                // Position aléatoire en haut de l'écran
                const startX = (Math.random() - 0.5) * 100;
                const startY = 60;
                const startZ = (Math.random() - 0.5) * 20;

                // Créer la traînée de l'étoile
                const points = [];
                const length = Math.random() * 3 + 2; // Longueur variable
                points.push(new THREE.Vector3(startX, startY, startZ));
                points.push(new THREE.Vector3(startX, startY - length, startZ));
                
                geometry.setFromPoints(points);

                const star = new THREE.Mesh(geometry, material);
                if (groupRef.current) {
                    groupRef.current.add(star);

                    // Animation de chute
                    gsap.to(star.position, {
                        y: -60, // Descendre jusqu'en bas
                        duration: Math.random() * 1 + 1, // Durée aléatoire
                        ease: "none",
                        onComplete: () => {
                            if (groupRef.current) {
                                groupRef.current.remove(star);
                                geometry.dispose();
                                material.dispose();
                            }
                        }
                    });

                    // Animation de la traînée
                    gsap.to(star.scale, {
                        y: 5,
                        duration: 0.3,
                        ease: "power1.in"
                    });

                    // Animation de l'opacité
                    gsap.to(material.uniforms.time, {
                        value: 1,
                        duration: 1,
                        ease: "power1.in"
                    });
                }
            }, i * 100); // Délai entre chaque étoile
        }
    }, []);

    useEffect(() => {
        // Créer une pluie d'étoiles toutes les 30 secondes
        const interval = setInterval(createShootingStar, 30000);
        
        // Première pluie immédiate
        createShootingStar();

        return () => {
            clearInterval(interval);
            if (groupRef.current) {
                groupRef.current.clear();
            }
        };
    }, [createShootingStar]);

    return <group ref={groupRef} visible={visible} />;
};

const Sun = ({ prayerTimes }) => {
    const sunRef = useRef();

    useEffect(() => {
        if (!sunRef.current || !prayerTimes) return;

        const times = {
            fajr: convertTimeToMinutes(prayerTimes.fajr),
            dohr: convertTimeToMinutes(prayerTimes.dohr),
            maghrib: convertTimeToMinutes(prayerTimes.maghrib)
        };

        const now = new Date();
        const currentTime = convertTimeToMinutes(`${now.getHours()}:${now.getMinutes()}`);

        let x = 0, y = -30, z = -50; // Default position

        if (currentTime >= times.fajr && currentTime <= times.maghrib) {
            const dayProgress = (currentTime - times.fajr) / (times.maghrib - times.fajr);
            y = Math.sin(dayProgress * Math.PI) * 40 - 10; // Linear trajectory
            x = (dayProgress - 0.5) * 40; // Slight horizontal movement
        }

        gsap.to(sunRef.current.position, {
            x, y, z,
            duration: 2,
            ease: "power2.inOut"
        });
    }, [prayerTimes]);

    return (
        <group ref={sunRef}>
            <mesh>
                <sphereGeometry args={[5, 32, 32]} />
                <meshBasicMaterial color="#FDB813" />
            </mesh>
        </group>
    );
};

const SkyGradient = ({ timeOfDay }) => {
    const colors = useMemo(() => ({
        night: ['#0B0B1A', '#000000'], // Bleu nuit profond
        fajr: ['#1B1B3A', '#614051'], // Aube plus naturelle
        sunrise: ['#FF7B54', '#FFB26B'], // Lever du soleil plus chaud
        day: ['#64A6BD', '#90C8E0'], // Bleu ciel plus naturel
        sunset: ['#FF6B6B', '#4A266A'], // Coucher de soleil plus dramatique
        maghrib: ['#2C1810', '#0B0B1A'] // Transition vers la nuit
    }), []);

    return (
        <mesh position={[0, 0, -100]}>
            <planeGeometry args={[200, 200]} />
            <shaderMaterial
                uniforms={{
                    colorTop: { value: new THREE.Color(colors[timeOfDay][0]) },
                    colorBottom: { value: new THREE.Color(colors[timeOfDay][1]) }
                }}
                vertexShader={`
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `}
                fragmentShader={`
                    uniform vec3 colorTop;
                    uniform vec3 colorBottom;
                    varying vec2 vUv;
                    void main() {
                        gl_FragColor = vec4(mix(colorBottom, colorTop, vUv.y), 1.0);
                    }
                `}
            />
        </mesh>
    );
};

const ThreeBackground = () => {
    return (
        <div className="fixed inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1], fov: 60 }}>
                <ambientLight intensity={0.1} />
                {/* Supprimez le soleil ici */}
                {/* Autres composants */}
            </Canvas>
        </div>
    );
};

export default ThreeBackground; 