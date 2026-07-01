"use client";

import { useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { usePointer } from "@/hooks/usePointer";
import { lerp } from "@/lib/utils";
import * as THREE from "three";

/** Frame the trophy across breakpoints: pull the camera back + widen the FOV
 *  on narrow screens so it never crops or overwhelms the mobile hero. */
function framing(width: number) {
  if (width < 640) return { z: 9, fov: 50 };
  if (width < 1024) return { z: 7.6, fov: 45 };
  return { z: 6.5, fov: 42 };
}

/**
 * Smoothly interpolates the camera toward a target derived from the pointer,
 * giving the hero a subtle "look around" parallax while always keeping the
 * origin framed.
 *
 * It also calls `regress()` on scroll/pointer activity so <AdaptiveDpr/> can
 * temporarily drop the render resolution during motion — where jank is felt —
 * and restore full crispness once things settle.
 */
export function CameraRig({ intensity = 1 }: { intensity?: number }) {
  const pointer = usePointer();
  const camera = useThree((s) => s.camera);
  const regress = useThree((s) => s.performance.regress);
  const target = new THREE.Vector3();

  useEffect(() => {
    const onActivity = () => regress();
    window.addEventListener("scroll", onActivity, { passive: true });
    window.addEventListener("pointermove", onActivity, { passive: true });
    return () => {
      window.removeEventListener("scroll", onActivity);
      window.removeEventListener("pointermove", onActivity);
    };
  }, [regress]);

  // Responsive framing: adjust camera distance + FOV to the viewport width.
  useEffect(() => {
    const persp = camera as THREE.PerspectiveCamera;
    const apply = () => {
      const { z, fov } = framing(window.innerWidth);
      persp.position.z = z;
      persp.fov = fov;
      persp.updateProjectionMatrix();
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [camera]);

  useFrame(() => {
    const px = pointer.current.x * intensity;
    const py = pointer.current.y * intensity;
    camera.position.x = lerp(camera.position.x, px * 1.4, 0.045);
    camera.position.y = lerp(camera.position.y, -py * 0.9, 0.045);
    camera.lookAt(target);
  });

  return null;
}
