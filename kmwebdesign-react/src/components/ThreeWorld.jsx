import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { FilmPass } from 'three/addons/postprocessing/FilmPass.js';

const CONFIG = {
  colors: {
    bg: 0x030305,
    primary: 0x00f3ff,
    secondary: 0xff0055,
    tertiary: 0x6e00ff,
  },
  bloom: {
    strength: 0.8,
    radius: 0.2,
    threshold: 0.1,
  },
};

const ThreeWorld = () => {
  const containerRef = useRef(null);
  const worldRef = useRef(null);

  useEffect(() => {
    const state = {
      mouseX: 0,
      mouseY: 0,
      targetRotationX: 0,
      targetRotationY: 0,
      scrollY: 0,
    };

    class World {
      constructor(container) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(CONFIG.colors.bg, 0.02);

        this.camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({
          canvas: this.container,
          antialias: false,
          powerPreference: 'high-performance',
          alpha: false,
          precision: 'lowp',
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;

        this.heroGroup = new THREE.Group();
        this.scene.add(this.heroGroup);

        this.particlesGroup = new THREE.Group();
        this.scene.add(this.particlesGroup);

        this.initLights();
        this.initObjects();
        this.initPostProcessing();
        this.addEventListeners();

        this.clock = new THREE.Clock();
        this.animate();
      }

      initLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
        this.scene.add(ambientLight);

        this.blueLight = new THREE.PointLight(CONFIG.colors.primary, 60, 40);
        this.blueLight.position.set(2, 2, 2);
        this.blueLight.castShadow = false;
        this.scene.add(this.blueLight);

        this.pinkLight = new THREE.PointLight(CONFIG.colors.secondary, 60, 40);
        this.pinkLight.position.set(-2, -2, 2);
        this.pinkLight.castShadow = false;
        this.scene.add(this.pinkLight);
      }

      initObjects() {
        const geometry = new THREE.IcosahedronGeometry(1, 1);
        const material = new THREE.MeshPhysicalMaterial({
          color: 0x111111,
          roughness: 0.2,
          metalness: 0.8,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          emissive: CONFIG.colors.tertiary,
          emissiveIntensity: 0.2,
          wireframe: true,
        });
        this.core = new THREE.Mesh(geometry, material);
        this.heroGroup.add(this.core);

        const innerGeo = new THREE.IcosahedronGeometry(0.8, 4);
        const innerMat = new THREE.MeshBasicMaterial({
          color: CONFIG.colors.primary,
          wireframe: true,
          transparent: true,
          opacity: 0.1,
        });
        this.innerCore = new THREE.Mesh(innerGeo, innerMat);
        this.heroGroup.add(this.innerCore);

        const torusGeo = new THREE.TorusGeometry(2.2, 0.02, 16, 100);
        const torusMat = new THREE.MeshBasicMaterial({
          color: CONFIG.colors.secondary,
        });
        this.ring = new THREE.Mesh(torusGeo, torusMat);
        this.ring.rotation.x = Math.PI / 2;
        this.heroGroup.add(this.ring);

        const torusGeo2 = new THREE.TorusGeometry(1.8, 0.01, 16, 100);
        const torusMat2 = new THREE.MeshBasicMaterial({
          color: CONFIG.colors.primary,
        });
        this.ring2 = new THREE.Mesh(torusGeo2, torusMat2);
        this.ring2.rotation.x = Math.PI / 3;
        this.heroGroup.add(this.ring2);

        const particlesGeometry = new THREE.BufferGeometry();
        const count = 1000;
        const posArray = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
          posArray[i] = (Math.random() - 0.5) * 20;
        }

        particlesGeometry.setAttribute(
          'position',
          new THREE.BufferAttribute(posArray, 3)
        );
        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.02,
          color: CONFIG.colors.primary,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
        });

        this.starField = new THREE.Points(particlesGeometry, particlesMaterial);
        this.particlesGroup.add(this.starField);
      }

      initPostProcessing() {
        this.composer = new EffectComposer(this.renderer);
        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          CONFIG.bloom.strength,
          CONFIG.bloom.radius,
          CONFIG.bloom.threshold
        );
        this.composer.addPass(bloomPass);

        const filmPass = new FilmPass(0.35, 0.025, 648, false);
        this.composer.addPass(filmPass);
      }

      addEventListeners() {
        window.addEventListener('resize', this.onWindowResize.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('scroll', this.onScroll.bind(this));
      }

      onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.composer.setSize(window.innerWidth, window.innerHeight);
      }

      onMouseMove(event) {
        state.mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
        state.mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
      }

      onScroll() {
        state.scrollY = window.scrollY;
      }

      animate = () => {
        requestAnimationFrame(this.animate);

        const time = this.clock.getElapsedTime();

        this.core.rotation.y += 0.005;
        this.core.rotation.x += 0.002;

        this.innerCore.rotation.y -= 0.01;

        const pulse = 1 + Math.sin(time * 2) * 0.05;
        this.innerCore.scale.set(pulse, pulse, pulse);

        this.ring.rotation.z += 0.01;
        this.ring.rotation.y = Math.sin(time * 0.5) * 0.2 + Math.PI / 2;
        this.ring2.rotation.x += 0.015;

        state.targetRotationX += (state.mouseX - state.targetRotationX) * 0.05;
        state.targetRotationY += (state.mouseY - state.targetRotationY) * 0.05;

        this.heroGroup.rotation.y = state.targetRotationX * 5;
        this.heroGroup.rotation.x = state.targetRotationY * 5;

        this.camera.position.y = -(state.scrollY * 0.005);

        const scrollProgress = Math.min(state.scrollY / window.innerHeight, 1);
        this.heroGroup.position.x = scrollProgress * 2.5;
        this.heroGroup.position.z = scrollProgress * -1;

        this.particlesGroup.rotation.y = time * 0.05;

        this.composer.render();
      };
    }

    if (containerRef.current) {
      const canvas = document.createElement('canvas');
      containerRef.current.appendChild(canvas);
      worldRef.current = new World(canvas);

      return () => {
        worldRef.current?.renderer?.dispose();
        canvas.remove();
      };
    }
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-0" />;
};

export default ThreeWorld;
