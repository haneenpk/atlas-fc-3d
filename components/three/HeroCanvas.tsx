"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  ContactShadows,
  Float,
  AdaptiveEvents,
  PerformanceMonitor,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Trophy } from "./Trophy";
import { Particles } from "./Particles";
import { CameraRig } from "./CameraRig";

/**
 * The hero WebGL scene: a floating championship trophy in a bright studio.
 * Client-only (dynamic import) so the 3D bundle never blocks first paint.
 *
 * Performance is *adaptive*: PerformanceMonitor measures real frame rate and,
 * if it drops, lowers the render resolution (DPR) and disables the expensive
 * Bloom pass — so weak GPUs stay smooth while strong ones keep the polish.
 * The whole loop also pauses (`active`) once the hero scrolls out of view.
 */
/** Rough "is this a weak GPU/CPU" guess so low-end devices start in lite mode
 *  immediately, instead of lagging for a second before the FPS monitor reacts. */
const isLowEnd =
  typeof navigator !== "undefined" && (navigator.hardwareConcurrency ?? 8) <= 4;

export default function HeroCanvas({ active = true }: { active?: boolean }) {
  // Start conservative; PerformanceMonitor steps these up/down from here.
  const [dpr, setDpr] = useState(isLowEnd ? 1 : 1.25);
  const [bloom, setBloom] = useState(!isLowEnd);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={dpr}
      gl={{
        antialias: true,
        alpha: true,
        stencil: false,
        depth: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0.4, 6.5], fov: 42 }}
      className="!absolute inset-0"
    >
      <PerformanceMonitor
        onDecline={() => {
          setDpr(1);
          setBloom(false);
        }}
        onIncline={() => setDpr(1.5)}
      />

      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 8, 5]} intensity={2.2} color="#ffffff" />
      <spotLight position={[-6, 4, 4]} angle={0.4} penumbra={1} intensity={30} color="#FF4A1C" />
      <spotLight position={[6, -2, 3]} angle={0.4} penumbra={1} intensity={18} color="#2540FF" />

      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.4}>
          <Trophy />
        </Float>

        <Particles count={200} />

        {/* baked once (frames={1}) — no per-frame shadow re-render */}
        <ContactShadows
          position={[0, -2.0, 0]}
          opacity={0.35}
          scale={14}
          blur={3}
          far={5}
          frames={1}
          resolution={256}
          color="#0C0D0E"
        />

        {/* Bright procedural studio for the gold reflections — no CDN fetch. */}
        <Environment resolution={128}>
          <Lightformer intensity={3} position={[0, 5, -5]} scale={[12, 8, 1]} color="#ffffff" />
          <Lightformer intensity={2} position={[-5, 2, 3]} scale={[5, 8, 1]} color="#ffd9c7" />
          <Lightformer intensity={1.6} position={[5, 0, 3]} scale={[5, 8, 1]} color="#cdd6ff" />
        </Environment>

        {bloom && (
          <EffectComposer multisampling={0} enableNormalPass={false}>
            <Bloom luminanceThreshold={0.9} intensity={0.4} mipmapBlur radius={0.5} />
          </EffectComposer>
        )}
      </Suspense>

      <CameraRig intensity={0.45} />

      <AdaptiveEvents />
    </Canvas>
  );
}
