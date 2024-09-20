import { CameraControls, Environment, Text } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Winter } from '../models/Winter.jsx';
import { degToRad } from 'maath/misc';
import { Suspense, useEffect, useRef, useState } from 'react';
import Loader from './Loader.jsx';

const HeroSection = () => {
  const controls = useRef();

  const intro = async () => {
    controls.current.dolly(-22);
    controls.current.smoothTime = 1.6;
    controls.current.dolly(22, true);
  };

  useEffect(() => {
    setTimeout(() => {
      if (controls.current) {
        console.log('Controls:', controls.current);
        intro();
      } else {
        console.log('controls.current est toujours undefined');
      }
    }, 500);
  }, []);

  return (
    <Canvas
      shadows
      camera={{
        position: [0, 0, 8],
        fov: 42
      }}
      style={{ height: '100vh', width: '100vw' }}
    >
      <Suspense fallback={<Loader />}>
        <color
          attach="background"
          args={['#171720']}
        />
        <fog
          attach="fog"
          args={['#171720', 8, 20]}
        />
        <CameraControls ref={controls} />
        <Text
          font="fonts/Poppins-Black.ttf"
          fontSize={0.8}
          position={[-1.3, -0.5, 1]}
          lineHeight={0.8}
          textAlign="center"
          color="white"
          rotation-y={degToRad(30)}
          // anchorY={'bottom'}
        >
          GRISCHKA{'\n'}GORSKI
        </Text>
        <group
          rotation-y={degToRad(160)}
          position-x={3}
        >
          <Winter scale={0.7} />
        </group>
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
};

export default HeroSection;
