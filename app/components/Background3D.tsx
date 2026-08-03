"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useState, useRef } from "react";

function ParticleStars(props: any) {
  const ref = useRef<any>(null);

  // Membuat titik-titik partikel 3D secara acak
  const [sphere] = useState<any>(() => {
    const positions = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500 * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    return positions;
  });

  // Animasi rotasi lambat 4D/3D
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#10b981"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleStars />
      </Canvas>
    </div>
  );
}
