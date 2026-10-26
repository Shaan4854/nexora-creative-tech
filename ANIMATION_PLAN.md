# NEXORA — Animation & Motion Choreography Specification
**Version:** 1.0.0
**Design Philosophy:** Purposeful, Physics-Grounded, Zero Cosmetic Waste

---

## 1. Executive Summary & Motion Hierarchy
At NEXORA, animation is not applied as superficial decoration. It serves three distinct functions:
1. **Spatial Depth & Tangibility:** Communicating mathematical precision through interactive 3D geometry and real-time vertex displacement.
2. **User Orientation & Spatial Hierarchy:** Guiding visual focus along the 12-column architectural grid during state transitions.
3. **Tactile Feedback:** Providing sub-10ms acoustic and visual confirmation on every interactive element.

---

## 2. Animation Layers & Ownership Matrix

| Layer | Technology | Ownership Scope | Framerate Target |
|---|---|---|---|
| **Layer 01: Ambient Atmosphere** | CSS Scanline & Grain | Background subtle raster sweep | 60 FPS (Hardware accelerated) |
| **Layer 02: 3D Centerpiece** | Three.js / WebGL 2.0 | Procedural polyhedron, quantum particle torus, 4D hypercube | 60–120 FPS |
| **Layer 03: Proving Ground Lab** | Canvas 2D / Verlet Math | 650 particles, radial vortex gravity, shockwave attenuation | 60 FPS locked |
| **Layer 04: UI Micro-Interactions** | Tailwind / CSS Transitions | Hover glow, button scales, tab indicator shifts | 60 FPS (< 150ms) |
| **Layer 05: Audio Synthesis** | Web Audio API | Sine/triangle harmonic feedback, 55Hz sub-drone | Real-time (< 5ms) |

---

## 3. Detailed Choreography Sequences

### 3.1 Hero Entrance & 3D Centerpiece
- **Phase 01 (0.0s – 0.3s):** Background architectural grid renders; coordinate indicators tick into place.
- **Phase 02 (0.3s – 0.8s):** Oversized display headline reveals with razor-sharp tracking.
- **Phase 03 (0.5s – 1.2s):** WebGL 2.0 canvas initializes. The procedural Icosahedron scales up from 0.8 to 1.0 with smooth inertial dampening.
- **Phase 04 (Continuous):**
  - Gentle continuous auto-rotation on Y/X axes (0.45 rad/s).
  - Smooth cursor-tracking interpolation: `pos += (target - pos) * 0.05`.
  - Inner octahedron pulses with sinusoidal scale: `1.0 + sin(t * 3) * 0.08`.
  - Orbiting laser rings counter-rotate on orthogonal axes.

### 3.2 3D Geometry Mode Transitions
- When switching between **CRYSTAL**, **QUANTUM**, and **TESSERACT**:
  1. Prior geometry buffers, textures, and materials are explicitly disposed via `.dispose()`.
  2. Audio chime triggers (sine chord at 880Hz / 1320Hz).
  3. New BufferGeometry is instantiated and bound to GPU memory within 1 frame.
  4. Vertex count and telemetry metrics update instantaneously on the optical reticle HUD.

### 3.3 The Proving Ground Physics Simulation
- **Vortex Attraction Mode:** Particles calculate distance vector to pointer; apply centripetal acceleration vector `(angle + PI/3) * force`.
- **Repulsion Burst Mode:** Deflects particles away with explosive impulse `force * 2.2`.
- **Harmonic Wave Mode:** Sinusoidal vertical displacement `sin(t * 3 + x * 0.02) * 0.6`.
- **Shockwave Impulse:** Pointer click spawns an expanding concentric wavefront (radius grows by 6px/frame up to 260px) that knocks particles outward with inverse-square velocity.

### 3.4 Modal Blueprint Drawer Expansion
- Backdrop blur initiates at `rgba(5, 6, 8, 0.85)` with 200ms ease.
- Modal card scales smoothly from 95% to 100% with subtle electric cyan drop shadow.
- Dedicated generative simulation canvas boots up, rendering real-time geometric radar/mesh specific to the project's visual identity.
- ESC key or background click triggers immediate clean unmount.

---

## 4. Accessibility & Reduced-Motion Protocol (`prefers-reduced-motion`)
- When `prefers-reduced-motion: reduce` is detected:
  - 3D auto-rotation speed is set to 0 (static rendering).
  - Scanline animation is disabled.
  - Particle physics simulation pauses ambient drift and only updates on direct pointer drag.
  - Page transitions and modal reveals use zero-duration opacity cuts instead of zoom/slide transforms.
  - Full content and all interactive controls remain 100% accessible and functional.

---

## 5. Performance Budget & Garbage Collection Safeguards
- **Max Draw Calls:** < 15 per frame.
- **Max GPU Memory:** < 65MB.
- **Device Pixel Ratio:** Capped at `Math.min(window.devicePixelRatio, 2)` to protect high-DPI retina mobile devices from thermal throttling.
- **Event Listeners:** All pointer and window resize handlers are cleanly unmounted in React cleanup functions.
