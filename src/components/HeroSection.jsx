import {
  CameraControls,
  Environment,
  Float,
  MeshReflectorMaterial,
  RenderTexture,
  Text,
  useFont
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Winter } from '../models/Winter.jsx';
import { degToRad } from 'maath/misc';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import Husky from '../models/Husky.jsx';
import SpinLoader from './SpinLoader.jsx';
import { useMediaQuery } from 'react-responsive';

const HeroSection = ({ setPage }) => {
  const controls = useRef();
  const [isActive, setIsActive] = useState(false); // True for testing
  const meshFitCameraHeroSection = useRef();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // Comment for testing
  const intro = async () => {
    controls.current.dolly(-42);
    controls.current.smoothTime = 1.6;

    controls.current.dolly(22, true);
    fitCamera();
  };

  useEffect(() => {
    setTimeout(() => {
      if (controls.current) {
        console.log('Controls:', controls.current);
        setIsActive(true);
        intro();
      }
      else {
        console.log('controls.current est toujours undefined');
      }
    }, 400);
  }, []);

  const fitCamera = async () => {
    controls.current.fitToBox(meshFitCameraHeroSection.current, true);
  };

  //TODO: Il va surement devoir faire un unique timeOut
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (meshFitCameraHeroSection.current && controls.current) {
        console.log('Controls:', meshFitCameraHeroSection.current);
        fitCamera(); // Appelle fitToBox seulement quand les refs sont prêtes
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', fitCamera);

    return () => {
      window.removeEventListener('resize', fitCamera);
    };
  }, []);

  return (
    <>
      <button
        className={`z-10 w-[fit-content] border-transparent hover:bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:text-white transition-all duration-300 px-4 py-3 rounded-full text-sm uppercase border bg-white text-black fixed transform -translate-x-1/2 left-1/2 ${isMobile ? 'top-20' : 'top-10'} '}`}
        onClick={() => setPage(null)}
      >
        Back
      </button>
      <Canvas
        shadows
        camera={{
          position: [0, 0, 8],
          fov: 42
        }}
        style={{ height: '100vh', width: '100vw' }}
      >
        <Suspense fallback={<SpinLoader />}>
          <color
            attach="background"
            args={['#171720']}
          />
          <fog
            attach="fog"
            args={['#171720', isMobile ? 20 : 10, isMobile ? 45 : 30]}
          />
          <CameraControls
            ref={controls}
            minPolarAngle={degToRad(20)}
            maxPolarAngle={degToRad(90)}
          />
            {isActive && (
              <>
                <mesh
                  ref={meshFitCameraHeroSection}
                  position-x={isMobile ? 0.5 :-0.3}
                  visible={false}
                >
                  <boxGeometry
                    color="orange"
                    transparent
                    opacity={0.5}
                    args={[10.5, 2, 2]}
                  />
                </mesh>
                <Text
                  font="fonts/Poppins-Black.ttf"
                  fontSize={0.8}
                  position={[-2.3, -0.5, 1]}
                  lineHeight={0.8}
                  textAlign="center"
                  color="white"
                  rotation-y={degToRad(30)}
                  // anchorY={'bottom'}
                >
                  DIVE INTO{'\n'}MY LAB
                  <meshBasicMaterial
                    color={'#fff'}
                    toneMapped={false}
                  >
                    <RenderTexture attach={'map'}>
                      <color
                        attach="background"
                        args={['#fff']}
                      />
                      <Environment preset="forest" />
                      <Float
                        floatIntensity={8}
                        rotationIntensity={1}
                      >
                        <Husky
                          isAnimating={true}
                          scale={0.8}
                          position={[0, -0.6, 1]}
                          rotation={[0, -5, 0]}
                        />
                      </Float>
                    </RenderTexture>
                  </meshBasicMaterial>
                </Text>
                <group
                  rotation-y={degToRad(160)}
                  position-x={3}
                >
                  <Winter scale={0.9} />
                </group>
                <mesh
                  position-y={-1.2}
                  rotation-x={-Math.PI / 2}
                >
                  <planeGeometry args={[100, 100]} />
                  <MeshReflectorMaterial
                    // mirror={1}
                    blur={[100, 50]}
                    resolution={2048}
                    mixBlur={1}
                    mixStrength={10}
                    roughness={1}
                    depthScale={1}
                    opacity={0.5}
                    transparent
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#333"
                    metalness={0.5}
                  />
                </mesh>
              </>
            )}
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </>
  );
};

useFont.preload('fonts/Poppins-Black.ttf');

export default HeroSection;
