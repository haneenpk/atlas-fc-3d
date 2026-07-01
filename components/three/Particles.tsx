"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Drifting particle field rendered as a single Points draw call. Positions
 * are generated once and memoized; only the group's rotation updates per
 * frame, so it stays cheap even with a few thousand points.
 */
export function Particles({ count = 900 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute in a wide, shallow shell around the camera.
      const r = 6 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 12;
      arr[i * 3] = Math.cos(theta) * r;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(theta) * r - 4;
    }
    return arr;
  }, [count]);

  useFrame((state, dt) => {
    if (!points.current) return;
    points.current.rotation.y += dt * 0.02;
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        sizeAttenuation
        color="#0C0D0E"
        transparent
        opacity={0.28}
        depthWrite={false}
      />
    </points>
  );
}
