import { Book } from './Book.jsx';
import { Environment, Float, Loader, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { UI } from './UI.jsx';
import { useMediaQuery } from 'react-responsive';

export const BookContainer = ({ handelChangeStep, displayButton }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [isMoving, setIsMoving] = useState(true);

  // TODO Gérer style pour le responsvie

  return (
    <>
      <Loader />
      <div
        className={`z-10 fixed flex mt-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center ${isTabletOrMobile ? 'mt-28 gap-2' : 'gap-6'}`}
      >
        <button
          onClick={() => setIsMoving((prevState) => !prevState)}
          className={`border-transparent hover:border-white transition-all duration-300 rounded-full uppercase shrink-0 border bg-black/30 text-white ml ${isTabletOrMobile ? 'text-base px-2 py-2' : 'text-lg px-4 py-3'}`}
        >
          {isMoving ? 'stop floating' : 'float'}
        </button>
        {displayButton && (
          <button
            onClick={handelChangeStep}
            className={`border-transparent hover:border-white transition-all duration-300 rounded-full uppercase shrink-0 border bg-black/30 text-white ${isTabletOrMobile ? 'text-base px-2 py-2' : 'text-lg px-4 py-3'}`}
          >
            More details
          </button>
        )}
      </div>

      <div className={'relative'}>
        <UI />
        <Canvas
          shadows
          camera={{
            position: [-0.5, 1, 4],
            fov: isTabletOrMobile ? 55 : 45
          }}
          style={{
            height: isTabletOrMobile ? '100dvh' : '100vh',
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
    </>
  );
};
