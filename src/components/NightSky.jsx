import { useEffect, useRef } from "react";
import * as THREE from "three";

const NightSky = () => {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // 🚀 Initialisation de Three.js
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        rendererRef.current = renderer;
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // S'assurer que le container est vide avant d'ajouter le canvas
        if (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
        }
        containerRef.current.appendChild(renderer.domElement);
        
        // 🌟 Générer 15 000 étoiles sans texture
        const numStars = 100000;
        const positions = new Float32Array(numStars * 3); // X, Y, Z pour chaque étoile
        const sizes = new Float32Array(numStars);

        for (let i = 0; i < numStars; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 200; // X
            positions[i * 3 + 1] = (Math.random() - 0.5) * 200; // Y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 200; // Z (profondeur)
            sizes[i] = Math.random() * 0.1 + 0.1; // Taille aléatoire
        }

        const starGeometry = new THREE.BufferGeometry();
        starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        starGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        // 🌠 Shader pour un effet de halo et de scintillement
        const starMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(0xffffff) },
                pointSize: { value: 1 },
                time: { value: 0 }
            },
            vertexShader: `
                uniform float pointSize;
                uniform float time;
                attribute float size;
                varying float vOpacity;
                
                void main() {
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = pointSize * (size * 0.5 + 0.5);
                    gl_Position = projectionMatrix * mvPosition;
                    
                    // Variation de la luminosité pour un effet de scintillement
                    vOpacity = 0.5 + 0.5 * sin(time + position.x * 0.1);
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                varying float vOpacity;

                void main() {
                    float dist = length(gl_PointCoord - vec2(0.5)); // Centre du point
                    float halo = smoothstep(0.5, 0.1, dist); // Halo doux

                    gl_FragColor = vec4(color, vOpacity * halo);
                }
            `,
            transparent: true
        });

        const starField = new THREE.Points(starGeometry, starMaterial);
        scene.add(starField);

        // 🌠 Animation de scintillement
        const animate = () => {
            requestAnimationFrame(animate);
            
            // 🌠 Déplacement des étoiles vers nous en réduisant leur position Z
            const positions = starGeometry.attributes.position.array;
            for (let i = 0; i < numStars; i++) {
                positions[i * 3 + 2] += 0.05; // 🌟 Déplacer légèrement vers nous (axe Z)
        
                // 🔄 Réinitialisation lorsque l'étoile sort du champ de vision
                if (positions[i * 3 + 2] > 100) {
                    positions[i * 3] = (Math.random() - 0.5) * 200; // X
                    positions[i * 3 + 1] = (Math.random() - 0.5) * 200; // Y
                    positions[i * 3 + 2] = -100; // Remettre l'étoile loin derrière
                }
            }
            starGeometry.attributes.position.needsUpdate = true;
        
            renderer.render(scene, camera);
        };

        animate();

        // 📏 Gérer le redimensionnement de la fenêtre
        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", handleResize);

        // Cleanup function
        return () => {
            if (rendererRef.current && rendererRef.current.domElement && containerRef.current) {
                try {
                    containerRef.current.removeChild(rendererRef.current.domElement);
                } catch (error) {
                    console.warn("Élément déjà supprimé ou inexistant");
                }
            }
            
            // Nettoyage de la mémoire
            if (sceneRef.current) {
                sceneRef.current.clear();
            }
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
            
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 z-0" />;
};

export default NightSky;


