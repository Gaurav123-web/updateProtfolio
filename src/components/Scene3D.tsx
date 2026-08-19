import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Points, PointMaterial, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function DNAHelix() {
  const group = useRef<THREE.Group>(null);
  const spheresA = useRef<THREE.Mesh[]>([]);
  const spheresB = useRef<THREE.Mesh[]>([]);

  const helixData = useMemo(() => {
    const count = 50;
    const radius = 1.5;
    const height = 7;
    const pts: { pos: THREE.Vector3; color: string }[] = [];
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 5;
      const y = (t - 0.5) * height;
      pts.push({
        pos: new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius),
        color: '#5eead4',
      });
      pts.push({
        pos: new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius),
        color: '#38bdf8',
      });
    }
    return pts;
  }, []);

  const rungData = useMemo(() => {
    const rungs: { a: THREE.Vector3; b: THREE.Vector3 }[] = [];
    const count = 50;
    const radius = 1.5;
    const height = 7;
    for (let i = 0; i < count; i += 2) {
      const t = i / count;
      const angle = t * Math.PI * 5;
      const y = (t - 0.5) * height;
      rungs.push({
        a: new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius),
        b: new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius),
      });
    }
    return rungs;
  }, []);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.35;
    spheresA.current.forEach((m, i) => {
      if (m) m.scale.setScalar(1 + Math.sin(performance.now() * 0.001 + i) * 0.15);
    });
    spheresB.current.forEach((m, i) => {
      if (m) m.scale.setScalar(1 + Math.sin(performance.now() * 0.001 + i + Math.PI) * 0.15);
    });
  });

  return (
    <group ref={group}>
      {helixData.map((p, i) => {
        const isA = i % 2 === 0;
        return (
          <mesh
            key={i}
            position={p.pos}
            ref={(el) => {
              if (el) {
                if (isA) spheresA.current.push(el);
                else spheresB.current.push(el);
              }
            }}
          >
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial
              color={p.color}
              emissive={p.color}
              emissiveIntensity={0.4}
              transparent
              opacity={0.85}
            />
          </mesh>
        );
      })}
      {rungData.map((r, i) => {
        const mid = r.a.clone().lerp(r.b, 0.5);
        const dir = r.b.clone().sub(r.a);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.normalize()
        );
        return (
          <mesh key={`r${i}`} position={[mid.x, mid.y, mid.z]} quaternion={quat}>
            <cylinderGeometry args={[0.015, 0.015, len, 6]} />
            <meshBasicMaterial color="#a78bfa" transparent opacity={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}

function CoreBlob() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.y += delta * 0.2;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref} position={[0, 0, 0]} scale={0.5}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#5eead4"
            distort={0.35}
            speed={2}
            transparent
            opacity={0.12}
            wireframe
          />
        </Sphere>
      </mesh>
    </Float>
  );
}

function FloatingMolecules() {
  const mols = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 9,
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 4 - 2,
        ] as [number, number, number],
        scale: 0.12 + Math.random() * 0.22,
        speed: 0.3 + Math.random() * 0.5,
        color: i % 3 === 0 ? '#5eead4' : i % 3 === 1 ? '#38bdf8' : '#a78bfa',
      })),
    []
  );

  return (
    <>
      {mols.map((m, i) => (
        <Float key={i} speed={m.speed * 2} rotationIntensity={1} floatIntensity={1.5}>
          <mesh position={m.position} scale={m.scale}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={m.color}
              wireframe
              transparent
              opacity={0.45}
              emissive={m.color}
              emissiveIntensity={0.15}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function ParticleField() {
  const positions = useMemo(() => {
    const arr = new Float32Array(2500 * 3);
    for (let i = 0; i < 2500; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} limit={2500}>
      <PointMaterial color="#5eead4" size={0.03} sizeAttenuation transparent opacity={0.35} />
    </Points>
  );
}

function MouseRig({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.5,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.3,
        0.05
      );
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#a78bfa" />
      <MouseRig>
        <DNAHelix />
        <CoreBlob />
        <FloatingMolecules />
        <ParticleField />
      </MouseRig>
    </Canvas>
  );
}
