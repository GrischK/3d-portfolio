import { Book } from './Book.jsx';
import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

export const BookContainer = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [-0.5, 1, 4], fov: 45 }}
    >
      <group position-y={0}>
        <Suspense fallback={null}>
          <Book />
          <OrbitControls />
          <Environment preset="studio"></Environment>
          <directionalLight
            position={[2, 5, 2]}
            instensity={2.5}
            castShadow
            shadow-mapSize-width={2040}
            shadow-mapSize-height={2040}
            shadow-bias={-0.0001}
          />
          <mesh
            position-y={-1.5}
            rotation-x={-Math.PI / 2}
            receiveShadow
          >
            <planeGeometry args={[100, 100]} />
            <shadowMaterial
              transparent
              opacity={0.2}
            />
          </mesh>
        </Suspense>
      </group>
    </Canvas>
  );
};
