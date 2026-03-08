import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const NUM_PARTICLES = 30000;

function createGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(0, 255, 255, 0.8)'); // Cyan glow
    gradient.addColorStop(0.5, 'rgba(0, 255, 65, 0.2)');  // Matrix green glow
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  return new THREE.CanvasTexture(canvas);
}

export default function Background3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.008); // Reduced fog density for better visibility

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100; // Moved camera back to see more of the spread

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(NUM_PARTICLES * 3);
    const colors = new Float32Array(NUM_PARTICLES * 3);
    const sizes = new Float32Array(NUM_PARTICLES);

    const color = new THREE.Color();
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const rand = Math.random();
      if (rand < 0.4) {
        color.setHex(0x00ffff); // Geek Cyan
      } else if (rand < 0.8) {
        color.setHex(0x00ff41); // Matrix Green
      } else {
        color.setHex(0x0a44ff); // Deep Tech Blue
      }
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      sizes[i] = Math.random() * 1.0 + 0.5; // Slightly smaller particles
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      map: createGlowTexture(),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.25, // Reduced opacity so it doesn't block text
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Generate shapes with much larger scale and spread for uniform distribution
    const shapes: Float32Array[] = [];
    
    function createShape(generator: (i: number) => [number, number, number]) {
      const arr = new Float32Array(NUM_PARTICLES * 3);
      for (let i = 0; i < NUM_PARTICLES; i++) {
        const [x, y, z] = generator(i);
        arr[i * 3] = x;
        arr[i * 3 + 1] = y;
        arr[i * 3 + 2] = z;
      }
      return arr;
    }

    // 1. Koch-like Fractal (Weierstrass function)
    shapes.push(createShape(() => {
      const t = Math.random() * Math.PI * 2;
      let r = 1;
      for (let k = 1; k <= 5; k++) {
        r += Math.cos(Math.pow(3, k) * t) / Math.pow(3, k);
      }
      r *= 40; // Scaled up
      const spread = Math.random() * 80; // Increased spread
      return [
        r * Math.cos(t) + (Math.random() - 0.5) * spread,
        r * Math.sin(t) + (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * 60
      ];
    }));

    // 2. Heart Curve
    shapes.push(createShape(() => {
      const t = Math.random() * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      const spread = Math.random() * 60;
      return [
        x * 4 + (Math.random() - 0.5) * spread,
        y * 4 + (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * 60
      ];
    }));

    // 3. Butterfly Curve
    shapes.push(createShape(() => {
      const t = Math.random() * Math.PI * 8;
      const r = Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12), 5);
      const x = Math.sin(t) * r;
      const y = Math.cos(t) * r;
      const spread = Math.random() * 70;
      return [
        x * 12 + (Math.random() - 0.5) * spread,
        y * 12 + (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * 60
      ];
    }));

    // 4. Archimedean Spiral (Vortex)
    shapes.push(createShape(() => {
      const t = Math.random() * Math.PI * 30;
      const r = 2.5 * t;
      const x = r * Math.cos(t);
      const y = r * Math.sin(t);
      const z = (Math.random() - 0.5) * 100;
      const spread = Math.random() * 60;
      return [
        x + (Math.random() - 0.5) * spread,
        y + (Math.random() - 0.5) * spread,
        z
      ];
    }));

    // 5. Catenary
    shapes.push(createShape(() => {
      const x = (Math.random() - 0.5) * 160;
      const a = 25;
      const y = a * Math.cosh(x / a) - 60;
      const spread = Math.random() * 80;
      return [
        x + (Math.random() - 0.5) * spread,
        y + (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * 80
      ];
    }));

    // 6. Bernoulli Lemniscate
    shapes.push(createShape(() => {
      const t = Math.random() * Math.PI * 2;
      const a = 80;
      const denom = 1 + Math.pow(Math.sin(t), 2);
      const x = (a * Math.cos(t)) / denom;
      const y = (a * Math.sin(t) * Math.cos(t)) / denom;
      const spread = Math.random() * 70;
      return [
        x + (Math.random() - 0.5) * spread,
        y + (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * 60
      ];
    }));

    // 7. Rose Curve
    shapes.push(createShape(() => {
      const t = Math.random() * Math.PI * 2;
      const k = 5;
      const r = 70 * Math.cos(k * t);
      const x = r * Math.cos(t);
      const y = r * Math.sin(t);
      const spread = Math.random() * 60;
      return [
        x + (Math.random() - 0.5) * spread,
        y + (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * 60
      ];
    }));

    // Initialize positions to the first shape
    const posAttribute = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < NUM_PARTICLES * 3; i++) {
      posAttribute[i] = shapes[0][i];
    }

    let currentShapeIndex = 0;
    let nextShapeIndex = 1;
    let transitionProgress = 0;
    let isTransitioning = false;
    let holdCounter = 0;
    
    const holdTime = 400; // frames to hold a shape
    const transitionSpeed = 0.004; // speed of morphing

    const animate = () => {
      requestAnimationFrame(animate);

      if (isTransitioning) {
        transitionProgress += transitionSpeed;
        if (transitionProgress >= 1) {
          transitionProgress = 0;
          currentShapeIndex = nextShapeIndex;
          nextShapeIndex = (nextShapeIndex + 1) % shapes.length;
          isTransitioning = false;
          holdCounter = 0;
        }
      } else {
        holdCounter++;
        if (holdCounter > holdTime) {
          isTransitioning = true;
        }
      }

      const currentShape = shapes[currentShapeIndex];
      const nextShape = shapes[nextShapeIndex];
      const positions = geometry.attributes.position.array as Float32Array;

      // Easing function (easeInOutCubic)
      const t = transitionProgress;
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const time = Date.now() * 0.0005;

      for (let i = 0; i < NUM_PARTICLES; i++) {
        const i3 = i * 3;
        let bx, by, bz;

        if (isTransitioning) {
          bx = currentShape[i3] + (nextShape[i3] - currentShape[i3]) * ease;
          by = currentShape[i3 + 1] + (nextShape[i3 + 1] - currentShape[i3 + 1]) * ease;
          bz = currentShape[i3 + 2] + (nextShape[i3 + 2] - currentShape[i3 + 2]) * ease;

          // Add chaotic swirl during transition
          const swirl = Math.sin(t * Math.PI) * 15;
          const angle = (i % 100) / 100 * Math.PI * 2 + t * Math.PI * 4;
          bx += Math.cos(angle) * swirl;
          by += Math.sin(angle) * swirl;
          bz += Math.cos(angle * 0.5) * swirl;
        } else {
          bx = currentShape[i3];
          by = currentShape[i3 + 1];
          bz = currentShape[i3 + 2];
        }

        // Continuous breathing/noise for the "vortex" feel
        const noiseX = Math.sin(time * 2 + i) * 1.5;
        const noiseY = Math.cos(time * 2 + i) * 1.5;
        const noiseZ = Math.sin(time * 2 + i * 0.5) * 1.5;

        positions[i3] = bx + noiseX;
        positions[i3 + 1] = by + noiseY;
        positions[i3 + 2] = bz + noiseZ;
      }

      geometry.attributes.position.needsUpdate = true;

      // Rotate the entire particle system slowly
      points.rotation.y += 0.001;
      points.rotation.x += 0.0005;
      points.rotation.z += 0.0002;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-[-1] pointer-events-none bg-[#050505]"
    />
  );
}
