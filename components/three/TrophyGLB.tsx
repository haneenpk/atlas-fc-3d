"use client";

import { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useScrollSpin } from "@/hooks/useScrollSpin";

/** Drop a converted model here (see public/models/README.md). */
const MODEL_URL = "/models/trophy.glb";

/** Target height in world units — the model is normalised to this regardless
 *  of the units it was authored in, so any downloaded trophy "just fits". */
const TARGET_HEIGHT = 3.4;

/**
 * Loads a real glTF trophy, auto-centres it at the origin and scales it to a
 * consistent height, then applies the shared scroll-spin. drei's useGLTF wires
 * up Draco + Meshopt automatically, so both compressed and plain .glb work.
 *
 * If /models/trophy.glb is absent this throws and <Trophy/> falls back to the
 * procedural model — the scene always renders something.
 */
export function TrophyGLB() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_URL);

  // The model ships without an .mtl, so give every mesh a shared polished-gold
  // metal that catches the studio Environment + Bloom.
  const gold = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#E7B24C",
        metalness: 1,
        roughness: 0.22,
        envMapIntensity: 1.4,
      }),
    []
  );

  // Clone so re-mounts don't mutate the cached original; normalise size + centre.
  const model = useMemo(() => {
    const root = scene.clone(true);

    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    box.getSize(size);
    const scale = TARGET_HEIGHT / (size.y || 1);
    root.scale.setScalar(scale);

    // Re-centre on the origin after scaling.
    const centeredBox = new THREE.Box3().setFromObject(root);
    const center = new THREE.Vector3();
    centeredBox.getCenter(center);
    root.position.sub(center);

    root.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.material = gold;
      }
    });

    return root;
  }, [scene, gold]);

  useScrollSpin(group);

  return (
    <group ref={group}>
      <primitive object={model} />
    </group>
  );
}

// Preload once the module is imported. Harmless 404 in console until you add
// the file; disappears as soon as /models/trophy.glb exists.
useGLTF.preload(MODEL_URL);
