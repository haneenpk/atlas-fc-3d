"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useScrollSpin } from "@/hooks/useScrollSpin";

/**
 * A championship trophy built from primitives — a lathed goblet bowl, twin
 * handles, a stem and a stacked plinth in reflective gold. Zero download,
 * always renders. Its Y-rotation is driven by scroll (damped) with a faint
 * idle sway, so it turns as you move down the hero.
 *
 * A real Draco .glb can later replace this by swapping <TrophyModel/> in the scene.
 */
export function TrophyModel() {
  const group = useRef<THREE.Group>(null);

  // Shared materials, created once.
  const mats = useMemo(() => {
    const gold = new THREE.MeshStandardMaterial({
      color: "#E7B24C",
      metalness: 1,
      roughness: 0.18,
      envMapIntensity: 1.4,
    });
    const goldBright = new THREE.MeshStandardMaterial({
      color: "#FFD37A",
      metalness: 1,
      roughness: 0.12,
      emissive: "#F4B740",
      emissiveIntensity: 0.5,
      toneMapped: false,
    });
    const plinthDark = new THREE.MeshStandardMaterial({
      color: "#141417",
      metalness: 0.6,
      roughness: 0.35,
    });
    const plaque = new THREE.MeshStandardMaterial({
      color: "#FF4A1C",
      metalness: 0.5,
      roughness: 0.4,
      emissive: "#FF4A1C",
      emissiveIntensity: 0.4,
      toneMapped: false,
    });
    return { gold, goldBright, plinthDark, plaque };
  }, []);

  // Lathe profile for the cup bowl (radius, height), spun around Y.
  const bowlGeo = useMemo(() => {
    const pts = [
      [0.0, 0.0],
      [0.2, 0.0],
      [0.32, 0.06],
      [0.52, 0.24],
      [0.68, 0.54],
      [0.8, 0.92],
      [0.82, 1.0],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 48);
  }, []);

  const handleGeo = useMemo(() => new THREE.TorusGeometry(0.32, 0.06, 16, 40), []);

  // Scroll-driven rotation (shared with the glTF trophy).
  useScrollSpin(group);

  return (
    <group ref={group} position={[0, -0.4, 0]} scale={1.7}>
      {/* Cup bowl */}
      <mesh geometry={bowlGeo} material={mats.gold} position={[0, 0.5, 0]} />
      {/* rim highlight ring (catches bloom) */}
      <mesh position={[0, 1.5, 0]} material={mats.goldBright}>
        <torusGeometry args={[0.81, 0.02, 12, 48]} />
      </mesh>

      {/* Handles */}
      <mesh geometry={handleGeo} material={mats.gold} position={[-0.78, 1.02, 0]} rotation={[0, 0, 0.5]} />
      <mesh geometry={handleGeo} material={mats.gold} position={[0.78, 1.02, 0]} rotation={[0, 0, -0.5]} />

      {/* Knot + stem */}
      <mesh material={mats.gold} position={[0, 0.42, 0]}>
        <sphereGeometry args={[0.16, 24, 24]} />
      </mesh>
      <mesh material={mats.gold} position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.09, 0.11, 0.42, 24]} />
      </mesh>

      {/* Base tiers */}
      <mesh material={mats.gold} position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.1, 40]} />
      </mesh>
      <RoundedBox args={[0.95, 0.28, 0.95]} radius={0.03} smoothness={4} position={[0, -0.26, 0]} material={mats.plinthDark} />
      {/* engraved plaque */}
      <mesh material={mats.plaque} position={[0, -0.26, 0.481]}>
        <boxGeometry args={[0.5, 0.12, 0.01]} />
      </mesh>
    </group>
  );
}
