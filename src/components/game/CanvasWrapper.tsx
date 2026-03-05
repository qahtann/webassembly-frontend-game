import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ParticleSystem } from '@/lib/wasm-loader';
import { useGameLoop } from '@/hooks/useGameLoop';
import { useTheme } from '@/hooks/useTheme';

interface CanvasWrapperProps {
  particleSystem: ParticleSystem | null;
  isRunning: boolean;
  gravity: number;
  attractionStrength: number;
  particleCount: number;
}

export function CanvasWrapper({
  particleSystem,
  isRunning,
  gravity,
  attractionStrength,
  particleCount,
}: CanvasWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const positionsArrayRef = useRef<Float32Array | null>(null);
  const { theme } = useTheme();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current || isInitialized) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(theme === 'dark' ? '#0a0a0a' : '#f5f5f5');
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Particle system
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({
      size: 0.05,
      color: theme === 'dark' ? '#60a5fa' : '#3b82f6',
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    setIsInitialized(true);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.Material).dispose();
      }
    };
  }, [theme, isInitialized]);

  // Update material color on theme change
  useEffect(() => {
    if (particlesRef.current) {
      const material = particlesRef.current.material as THREE.PointsMaterial;
      material.color.set(theme === 'dark' ? '#60a5fa' : '#3b82f6');
    }
    if (sceneRef.current) {
      sceneRef.current.background = new THREE.Color(theme === 'dark' ? '#0a0a0a' : '#f5f5f5');
    }
  }, [theme]);

  // Game loop
  useGameLoop(
    (deltaTime) => {
      if (!particleSystem || !particlesRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) {
        return;
      }

      // Simulate particles in WASM
      particleSystem.simulate(deltaTime, gravity, attractionStrength);

      // Get positions from WASM
      const positions = new Float32Array(particleSystem.get_positions());

      // Update Three.js geometry
      const geometry = particlesRef.current.geometry;
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.attributes.position.needsUpdate = true;

      // Rotate camera slightly for visual interest
      const time = performance.now() * 0.0005;
      cameraRef.current.position.x = Math.sin(time) * 5;
      cameraRef.current.position.z = Math.cos(time) * 5;
      cameraRef.current.lookAt(0, 0, 0);

      // Render
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    },
    isRunning && isInitialized
  );

  // Update particle count
  useEffect(() => {
    if (particleSystem && particlesRef.current) {
      particleSystem.set_particle_count(particleCount);
      const positions = new Float32Array(particleSystem.get_positions());
      const geometry = particlesRef.current.geometry;
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.attributes.position.needsUpdate = true;
    }
  }, [particleCount, particleSystem]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[600px]"
      role="img"
      aria-label="3D particle simulation"
    />
  );
}
