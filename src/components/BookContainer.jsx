import { Book } from './Book.jsx';
import { Environment, Float, Loader, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { UI } from './UI.jsx';

export const BookContainer = () => {
  return (
    <>
      <UI />
      <Loader />
      <Canvas
        shadows
        camera={{ position: [-0.5, 1, 4], fov: 45 }}
        style={{
          height: '100vh',
          width: '100vw',
          zIndex: 2
          // background:
          //   'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 0%, rgba(9,9,121,1) 87%)'
        }}
      >
        <group position-y={0}>
          <Suspense fallback={null}>
            <Float
              rotation-x={-Math.PI / 4}
              floatIntensity={1}
              speed={2}
              rotationIntensity={2}
            >
              <Book />
            </Float>
            <OrbitControls />
            <Environment preset="studio"></Environment>
            <directionalLight
              position={[2, 5, 5]}
              intensity={10}
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
    </>
  );
};
