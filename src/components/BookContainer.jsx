import { Book } from './Book.jsx';
import { Environment, Float, Loader, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { UI } from './UI.jsx';
import { useMediaQuery } from 'react-responsive';
import CTA from './CTA.jsx';

export const BookContainer = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const [isMoving, setIsMoving] = useState(true);

  return (
    <>
      <Loader />
      <button
        onClick={() => setIsMoving((prevState) => !prevState)}
        className={`z-10 fixed border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border bg-black/30 text-white ml-3 ${isTabletOrMobile ? 'mt-20' : 'mt-3'} `}
      >
        {isMoving ? 'stop floating' : 'float'}
      </button>
      <div className={"relative"}>
        <UI />
        <Canvas
          shadows
          camera={{ position: [-0.5, 1, 4], fov: isTabletOrMobile ? 55 : 45 }}
          style={{
            height: '100vh',
            width: '100vw',
            zIndex: 2
          }}
        >
          <group position-y={0}>
            <Suspense fallback={null}>
              <Float
                rotation-x={isMoving ? -Math.PI / 3.5 : 0}
                floatIntensity={isMoving ? 1 : 0}
                speed={isMoving ? 2 : 0}
                rotationIntensity={isMoving ? 2 : 0}
              >
                <Book />
              </Float>
              <OrbitControls />
              <Environment
                preset="warehouse"
                intensity={0.5}
                background={false}
              ></Environment>
              <directionalLight
                position={[2, 6, 5]}
                intensity={0.5}
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
      </div>
      <CTA />
    </>
  );
};
