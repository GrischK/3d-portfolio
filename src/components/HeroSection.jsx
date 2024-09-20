import {
  CameraControls,
  Environment,
  Float,
  MeshReflectorMaterial,
  RenderTexture,
  Text
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Winter } from '../models/Winter.jsx';
import { degToRad } from 'maath/misc';
import { Suspense, useEffect, useRef, useState } from 'react';
import Loader from './Loader.jsx';

const HeroSection = () => {
  const controls = useRef();
  const [isActive, setIsActive] = useState(true); // Comment for testing

  // Comment for testing

  // const intro = async () => {
  //   controls.current.dolly(-22);
  //   controls.current.smoothTime = 1.6;
  //   controls.current.dolly(22, true);
  // };
  //
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (controls.current) {
  //       console.log('Controls:', controls.current);
  //       setIsActive(true);
  //       intro();
  //     } else {
  //       console.log('controls.current est toujours undefined');
  //     }
  //   }, 400);
  // }, []);

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
          args={['#171720', 10, 20]}
        />
        <CameraControls ref={controls} />
        {isActive && (
          <>
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
              <meshBasicMaterial color="white">
                <RenderTexture attach={'map'}>
                  <color
                    attach="background"
                    args={['#fff']}
                  />
                  <Environment preset="sunset" />
                  <Float
                    floatIntensity={4}
                    rotationIntensity={5}
                  >
                    <Winter scale={1.6} />
                  </Float>
                </RenderTexture>
              </meshBasicMaterial>
            </Text>
            <group
              rotation-y={degToRad(160)}
              position-x={3}
            >
              <Winter scale={0.7} />
            </group>
            <mesh
              position-y={-1.1}
              rotation-x={-Math.PI / 2}
            >
              <planeGeometry args={[100, 100]} />
              <MeshReflectorMaterial
                mirror={1}
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
  );
};

export default HeroSection;
