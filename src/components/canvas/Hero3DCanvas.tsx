"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { useSound } from "@/components/audio/SoundSynthesizer";
import { Eye, Layers, RotateCw, Sparkles, Activity } from "lucide-react";

export type GeometryMode = "crystal" | "quantum" | "tesseract";

export const Hero3DCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { playClick, playHover } = useSound();

  const [activeMode, setActiveMode] = useState<GeometryMode>("crystal");
  const [wireframeOnly, setWireframeOnly] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [fps, setFps] = useState(60);
  const [vertexCount, setVertexCount] = useState(12480);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const objectGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Mouse / Pointer tracking
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDragging: false, prevX: 0, prevY: 0 });

  // Switch geometry meshes
  const setupGeometryMode = useCallback((mode: GeometryMode, wireframe: boolean) => {
    const group = objectGroupRef.current;
    if (!group) return;

    // Clear existing children
    while (group.children.length > 0) {
      const child = group.children[0] as THREE.Mesh | THREE.Points;
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
      group.remove(child);
    }

    if (mode === "crystal") {
      // 1. Crystal Core: Complex Icosahedron with inner glow core & outer geometric rings
      const mainGeo = new THREE.IcosahedronGeometry(2.2, 3);
      setVertexCount(mainGeo.attributes.position.count);

      const mainMat = new THREE.MeshPhysicalMaterial({
        color: 0x0a1020,
        emissive: 0x050c18,
        roughness: 0.15,
        metalness: 0.85,
        transmission: wireframe ? 0 : 0.6,
        ior: 1.6,
        wireframe: wireframe,
        flatShading: true,
      });

      const mainMesh = new THREE.Mesh(mainGeo, mainMat);
      mainMesh.name = "core";
      group.add(mainMesh);

      // Inner glowing core
      const innerGeo = new THREE.OctahedronGeometry(1.2, 2);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.75,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      innerMesh.name = "inner";
      group.add(innerMesh);

      // Orbiting laser rings
      const ringGeo = new THREE.TorusGeometry(3.2, 0.02, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.6,
      });
      const ring1 = new THREE.Mesh(ringGeo, ringMat);
      ring1.rotation.x = Math.PI / 3;
      ring1.name = "ring1";
      group.add(ring1);

      const ring2 = new THREE.Mesh(ringGeo, ringMat);
      ring2.rotation.y = Math.PI / 4;
      ring2.name = "ring2";
      group.add(ring2);
    } else if (mode === "quantum") {
      // 2. Quantum Matrix: 15,000 particle Torus Knot
      const particleCount = 14000;
      setVertexCount(particleCount);
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const color1 = new THREE.Color(0x00f0ff);
      const color2 = new THREE.Color(0x8b5cf6);
      const color3 = new THREE.Color(0x00ff88);

      for (let i = 0; i < particleCount; i++) {
        // Torus knot formula distribution with radial noise
        const u = Math.random() * Math.PI * 2 * 3;
        const p = 3;
        const q = 7;
        const r = 2.0 + 0.4 * Math.sin(q * u);

        const x = r * Math.cos(p * u) + (Math.random() - 0.5) * 0.4;
        const y = r * Math.sin(p * u) + (Math.random() - 0.5) * 0.4;
        const z = -Math.sin(q * u) * 1.5 + (Math.random() - 0.5) * 0.4;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const mixColor = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
        colors[i * 3] = mixColor.r;
        colors[i * 3 + 1] = mixColor.g;
        colors[i * 3 + 2] = mixColor.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const pMat = new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });

      const pSystem = new THREE.Points(pGeo, pMat);
      pSystem.name = "particles";
      group.add(pSystem);
    } else if (mode === "tesseract") {
      // 3. Tesseract Wireframe: 4D hypercube projection
      setVertexCount(2400);

      // Outer cube
      const outerGeo = new THREE.BoxGeometry(3.0, 3.0, 3.0);
      const outerMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });
      const outerCube = new THREE.Mesh(outerGeo, outerMat);
      outerCube.name = "outerCube";
      group.add(outerCube);

      // Inner cube
      const innerGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.9,
      });
      const innerCube = new THREE.Mesh(innerGeo, innerMat);
      innerCube.name = "innerCube";
      group.add(innerCube);

      // Connecting vertices laser lines
      const linePositions: number[] = [];
      const outerCorners = [
        [-1.5, -1.5, -1.5], [1.5, -1.5, -1.5], [1.5, 1.5, -1.5], [-1.5, 1.5, -1.5],
        [-1.5, -1.5, 1.5], [1.5, -1.5, 1.5], [1.5, 1.5, 1.5], [-1.5, 1.5, 1.5]
      ];
      const innerCorners = outerCorners.map(c => [c[0] * 0.5, c[1] * 0.5, c[2] * 0.5]);

      for (let i = 0; i < 8; i++) {
        linePositions.push(...outerCorners[i], ...innerCorners[i]);
      }

      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.6,
      });
      const hyperEdges = new THREE.LineSegments(lineGeo, lineMat);
      hyperEdges.name = "hyperEdges";
      group.add(hyperEdges);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;

    // Initialize Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7.5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 3, 20);
    cyanLight.position.set(5, 5, 5);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 3, 20);
    violetLight.position.set(-5, -5, 5);
    scene.add(violetLight);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    objectGroupRef.current = rootGroup;

    // Initial Geometry setup
    setupGeometryMode(activeMode, wireframeOnly);

    // Mouse listeners for interactive drag and rotation
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x * 0.6;
      mouseRef.current.targetY = y * 0.6;

      if (mouseRef.current.isDragging) {
        const deltaX = e.clientX - mouseRef.current.prevX;
        const deltaY = e.clientY - mouseRef.current.prevY;
        rootGroup.rotation.y += deltaX * 0.008;
        rootGroup.rotation.x += deltaY * 0.008;
        mouseRef.current.prevX = e.clientX;
        mouseRef.current.prevY = e.clientY;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      mouseRef.current.isDragging = true;
      mouseRef.current.prevX = e.clientX;
      mouseRef.current.prevY = e.clientY;
    };

    const onPointerUp = () => {
      mouseRef.current.isDragging = false;
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    // Responsive Resize observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop with FPS Counter
    let lastTime = performance.now();
    let frameCount = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // FPS update
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }

      // Smooth inertia rotation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (rootGroup) {
        if (isRotating && !mouseRef.current.isDragging) {
          rootGroup.rotation.y += delta * 0.45;
          rootGroup.rotation.x += delta * 0.15;
        }

        // Apply mouse sway tilt
        rootGroup.position.x = mouseRef.current.x * 0.4;
        rootGroup.position.y = mouseRef.current.y * 0.4;

        // Custom object animations
        const inner = rootGroup.getObjectByName("inner");
        if (inner) {
          inner.rotation.y -= delta * 0.8;
          inner.rotation.z += delta * 0.4;
          const scale = 1.0 + Math.sin(time * 3) * 0.08;
          inner.scale.set(scale, scale, scale);
        }

        const ring1 = rootGroup.getObjectByName("ring1");
        if (ring1) ring1.rotation.z += delta * 0.3;

        const ring2 = rootGroup.getObjectByName("ring2");
        if (ring2) ring2.rotation.x += delta * 0.4;

        const innerCube = rootGroup.getObjectByName("innerCube");
        if (innerCube) {
          innerCube.rotation.y -= delta * 0.6;
          innerCube.rotation.z -= delta * 0.3;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);

      // Cleanup
      scene.clear();
      renderer.dispose();
    };
  }, [setupGeometryMode, isRotating, activeMode, wireframeOnly]);

  const handleModeChange = (mode: GeometryMode) => {
    playClick();
    setActiveMode(mode);
    setupGeometryMode(mode, wireframeOnly);
  };

  const toggleWireframe = () => {
    playClick();
    setWireframeOnly((prev) => {
      const next = !prev;
      setupGeometryMode(activeMode, next);
      return next;
    });
  };

  const toggleRotation = () => {
    playClick();
    setIsRotating((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] md:h-[680px] flex items-center justify-center select-none overflow-hidden"
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing z-10"
        title="Interactive 3D Centerpiece: Click and drag to rotate"
      />

      {/* Optical Reticle HUD Elements */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 md:p-8 z-20">
        {/* Top Telemetry */}
        <div className="flex items-center justify-between font-mono text-[11px] text-text-dim tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-beam-cyan animate-ping" />
            <span className="text-beam-cyan font-semibold">WEBGL 2.0 // ACTIVE</span>
            <span className="hidden sm:inline text-text-dim">| PRECISION SHADER DISPERSION</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-beam-cyan" />
              <span className="text-text-muted">{fps} FPS</span>
            </span>
            <span className="hidden sm:inline text-text-dim">VERTICES: {vertexCount.toLocaleString()}</span>
          </div>
        </div>

        {/* Bottom Coordinates & Drag Cue */}
        <div className="flex items-end justify-between font-mono text-[10px] text-text-dim tracking-widest">
          <div className="space-y-0.5">
            <div>CAM // FOV: 45° DIST: 7.5u</div>
            <div className="text-text-muted hidden sm:block">STATUS: DRAG TO MANIPULATE VECTOR SPACE</div>
          </div>
          <div className="flex items-center gap-1.5 bg-obsidian/60 border border-borderDim px-2.5 py-1 rounded">
            <span className="text-beam-violet">MODE:</span>
            <span className="text-white font-semibold uppercase">{activeMode}</span>
          </div>
        </div>
      </div>

      {/* Interactive Control Deck */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 p-1.5 rounded-full bg-obsidian/90 border border-borderDim shadow-glowCyan backdrop-blur-md">
        <button
          onClick={() => handleModeChange("crystal")}
          onMouseEnter={playHover}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
            activeMode === "crystal"
              ? "bg-beam-cyan/20 text-beam-cyan border border-beam-cyan/50 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              : "text-text-muted hover:text-white hover:bg-surface"
          }`}
          title="Crystal Core: Refractive Optical Geometry"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>CRYSTAL</span>
        </button>

        <button
          onClick={() => handleModeChange("quantum")}
          onMouseEnter={playHover}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
            activeMode === "quantum"
              ? "bg-beam-violet/20 text-beam-violet border border-beam-violet/50 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              : "text-text-muted hover:text-white hover:bg-surface"
          }`}
          title="Quantum Matrix: 14K Particle Torus Knot"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>QUANTUM</span>
        </button>

        <button
          onClick={() => handleModeChange("tesseract")}
          onMouseEnter={playHover}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
            activeMode === "tesseract"
              ? "bg-beam-laser/20 text-beam-laser border border-beam-laser/50 shadow-[0_0_15px_rgba(0,255,136,0.3)]"
              : "text-text-muted hover:text-white hover:bg-surface"
          }`}
          title="Tesseract: 4D Hypercube Projection"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>TESSERACT</span>
        </button>

        <div className="h-4 w-px bg-borderDim mx-0.5" />

        <button
          onClick={toggleWireframe}
          onMouseEnter={playHover}
          aria-pressed={wireframeOnly}
          className={`p-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
            wireframeOnly
              ? "bg-beam-cyan text-void"
              : "text-text-muted hover:text-white hover:bg-surface"
          }`}
          title={wireframeOnly ? "Switch to Solid Material" : "Toggle Wireframe Mesh"}
        >
          <Layers className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={toggleRotation}
          onMouseEnter={playHover}
          aria-pressed={isRotating}
          className={`p-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
            isRotating
              ? "text-beam-cyan hover:bg-surface"
              : "text-text-dim hover:text-white hover:bg-surface"
          }`}
          title={isRotating ? "Pause Auto-Rotation" : "Resume Auto-Rotation"}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? "animate-[spin_8s_linear_infinite]" : ""}`} />
        </button>
      </div>
    </div>
  );
};
